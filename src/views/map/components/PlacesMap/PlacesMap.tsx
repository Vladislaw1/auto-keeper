import axios from 'axios';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { useMap, useMapEvents } from 'react-leaflet';
import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Place, PlaceBounds, PlaceCategory, placesService } from '@/services/places';
import { categoryColor, categoryIcon, formatDistance, placeTitle } from '@/views/map/formatPlace';
import './places-cluster.css';

const BOUNDS_DEBOUNCE_MS = 500;

export type MapCamera =
  | {
      id: number;
      kind: 'point';
      lat: number;
      lon: number;
      zoom: number;
    }
  | {
      id: number;
      kind: 'bounds';
      points: Array<[number, number]>;
    };

export type MapPlace = Place & { distance?: number };

interface PlacesMapProps {
  places: MapPlace[];
  categories: PlaceCategory[];
  selectedId: string | null;
  camera: MapCamera | null;
  onLoaded: (places: Place[]) => void;
  onSelect: (place: MapPlace) => void;
  onBoundsError: (message: string | null) => void;
}

export type PlacesMapHandle = {
  invalidateBounds: () => void;
};

const isCanceled = (error: unknown) =>
  axios.isCancel(error) || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED');

const readBounds = (bounds: {
  getSouth(): number;
  getWest(): number;
  getNorth(): number;
  getEast(): number;
}): PlaceBounds => ({
  south: bounds.getSouth(),
  west: bounds.getWest(),
  north: bounds.getNorth(),
  east: bounds.getEast(),
});

const isValidBounds = (bounds: PlaceBounds) =>
  bounds.south >= -90 &&
  bounds.north <= 90 &&
  bounds.south <= bounds.north &&
  bounds.west >= -180 &&
  bounds.east <= 180 &&
  bounds.west <= bounds.east;

const markerIcons = new Map<string, L.DivIcon>();

const placeMarkerIcon = (category: PlaceCategory, selected: boolean) => {
  const key = `${category}:${selected ? 1 : 0}`;
  const cached = markerIcons.get(key);
  if (cached) return cached;

  const size = selected ? 34 : 28;
  const color = categoryColor(category);
  const Icon = categoryIcon[category] ?? categoryIcon.CAR_REPAIR;
  const glyph = renderToStaticMarkup(createElement(Icon, { color, size: selected ? 18 : 16 }));
  const icon = L.divIcon({
    className: 'place-marker-icon',
    html: `<span class="place-marker-badge${selected ? ' place-marker-badge-selected' : ''}" style="width:${size}px;height:${size}px;border-color:${color}">${glyph}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
  markerIcons.set(key, icon);
  return icon;
};

const clusterIcon = (cluster: L.MarkerCluster) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 34 : count < 100 ? 42 : 48;

  return L.divIcon({
    className: 'place-cluster-icon',
    html: `<span class="place-cluster">${count}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const escapeTooltip = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    if (char === '&') return '&amp;';
    if (char === '<') return '&lt;';
    if (char === '>') return '&gt;';
    if (char === '"') return '&quot;';
    return '&#39;';
  });

export const PlacesMap = forwardRef<PlacesMapHandle, PlacesMapProps>(function PlacesMap(
  { places, categories, selectedId, camera, onLoaded, onSelect, onBoundsError },
  ref,
) {
  const map = useMap();
  const controllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const requestSeq = useRef(0);
  const onSelectRef = useRef(onSelect);
  const selectedIdRef = useRef(selectedId);
  const markersRef = useRef<Array<{ id: string; category: PlaceCategory; marker: L.Marker }>>([]);
  onSelectRef.current = onSelect;
  selectedIdRef.current = selectedId;

  const invalidateBounds = useCallback(() => {
    requestSeq.current += 1;
    clearTimeout(timerRef.current);
    controllerRef.current?.abort();
  }, []);

  useImperativeHandle(ref, () => ({ invalidateBounds }), [invalidateBounds]);

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const seq = ++requestSeq.current;

    const bounds = readBounds(map.getBounds());
    if (!isValidBounds(bounds)) return;

    try {
      const items = await placesService.getInBounds(bounds, categories, controller.signal);
      if (seq !== requestSeq.current) return;
      onBoundsError(null);
      onLoaded(items);
    } catch (error) {
      if (isCanceled(error) || seq !== requestSeq.current) return;
      onBoundsError('Не вдалося завантажити місця для цієї області');
    }
  }, [categories, map, onBoundsError, onLoaded]);

  useEffect(() => {
    load();
    return () => {
      clearTimeout(timerRef.current);
      controllerRef.current?.abort();
    };
  }, [load]);

  useEffect(() => {
    if (!camera) return;

    if (camera.kind === 'point') {
      map.flyTo([camera.lat, camera.lon], camera.zoom);
      return;
    }

    if (camera.points.length === 1) {
      map.flyTo(camera.points[0], 15);
      return;
    }

    if (camera.points.length > 1) {
      map.fitBounds(camera.points, { padding: [48, 48], maxZoom: 15 });
    }
  }, [camera, map]);

  useMapEvents({
    moveend: () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(load, BOUNDS_DEBOUNCE_MS);
    },
  });

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      maxClusterRadius: (zoom) => (zoom < 12 ? 80 : zoom < 15 ? 50 : 32),
      disableClusteringAtZoom: 17,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: clusterIcon,
    });

    const markers = places.map((place) => {
      const marker = L.marker([place.lat, place.lon], {
        icon: placeMarkerIcon(place.category, place.id === selectedIdRef.current),
      });
      const distance =
        typeof place.distance === 'number' ? ` · ${formatDistance(place.distance)}` : '';
      marker.bindTooltip(escapeTooltip(`${placeTitle(place.name, place.category)}${distance}`));
      marker.on('click', () => onSelectRef.current(place));
      return { id: place.id, category: place.category, marker };
    });

    markersRef.current = markers;
    cluster.addLayers(markers.map((item) => item.marker));
    map.addLayer(cluster);

    return () => {
      map.removeLayer(cluster);
      markersRef.current = [];
    };
  }, [map, places]);

  useEffect(() => {
    markersRef.current.forEach(({ id, category, marker }) => {
      marker.setIcon(placeMarkerIcon(category, id === selectedId));
    });
  }, [selectedId]);

  return null;
});
