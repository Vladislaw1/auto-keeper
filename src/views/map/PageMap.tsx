import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { Map } from '@/components/custom';
import { NearbyPlace, Place, PlaceCategory, placesService } from '@/services/places';
import { CategoryFilter } from '@/views/map/components/CategoryFilter';
import { PlacePanel } from '@/views/map/components/PlacePanel';
import { MapCamera, MapPlace, PlacesMap, PlacesMapHandle } from '@/views/map/components/PlacesMap';
import { formatDistance, placeTitle } from '@/views/map/formatPlace';

const NEARBY_RADIUS = 5000;
const NEARBY_LIMIT = 20;

const PageMap = () => {
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [nearby, setNearby] = useState<NearbyPlace[]>([]);
  const [categories, setCategories] = useState<PlaceCategory[]>([]);
  const [selected, setSelected] = useState<MapPlace | null>(null);
  const [camera, setCamera] = useState<MapCamera | null>(null);
  const [locating, setLocating] = useState(false);
  const [nearbyMessage, setNearbyMessage] = useState<string | null>(null);
  const [boundsError, setBoundsError] = useState<string | null>(null);
  const mapRef = useRef<PlacesMapHandle>(null);
  const userPoint = useRef<{ lat: number; lon: number } | null>(null);
  const nearbyRequest = useRef(0);

  const handleLoaded = useCallback((items: Place[]) => {
    setPlaces(items);
  }, []);

  const handleBoundsError = useCallback((message: string | null) => {
    setBoundsError(message);
  }, []);

  const handleUpdated = (updated: Place) => {
    const merge = <T extends Place>(item: T): T =>
      item.id === updated.id ? { ...item, ...updated } : item;

    setPlaces((items) => items.map(merge));
    setNearby((items) => items.map(merge));
    setSelected((current) => (current && current.id === updated.id ? merge(current) : current));
  };

  const searchNearby = useCallback(
    async (lat: number, lon: number, selectedCategories: PlaceCategory[]) => {
      const requestId = ++nearbyRequest.current;
      const items = await placesService.getNearby({
        lat,
        lon,
        radius: NEARBY_RADIUS,
        limit: NEARBY_LIMIT,
        categories: selectedCategories,
      });
      if (requestId !== nearbyRequest.current) return null;
      return items;
    },
    [],
  );

  useEffect(() => {
    const point = userPoint.current;
    if (!point) return;

    let active = true;
    searchNearby(point.lat, point.lon, categories)
      .then((items) => {
        if (!active || !items) return;
        setNearby(items);
        setNearbyMessage(items.length ? null : 'У радіусі 5 км місць не знайдено');
      })
      .catch(() => {
        if (active) setNearbyMessage('Не вдалося знайти місця поруч');
      });

    return () => {
      active = false;
    };
  }, [categories, searchNearby]);

  const handleNearby = () => {
    if (!navigator.geolocation) {
      setNearbyMessage('Геолокація недоступна в цьому браузері');
      return;
    }

    setLocating(true);
    setNearbyMessage(null);
    mapRef.current?.invalidateBounds();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        userPoint.current = { lat: latitude, lon: longitude };

        try {
          const items = await searchNearby(latitude, longitude, categories);
          if (!items) return;

          setNearby(items);
          mapRef.current?.invalidateBounds();

          if (items.length) {
            setPlaces(items);
            setCamera({
              id: Date.now(),
              kind: 'bounds',
              points: items.map((item) => [item.lat, item.lon]),
            });
            setNearbyMessage(null);
          } else {
            setCamera({
              id: Date.now(),
              kind: 'point',
              lat: latitude,
              lon: longitude,
              zoom: 14,
            });
            setNearbyMessage('У радіусі 5 км місць не знайдено');
          }
        } catch {
          setNearbyMessage('Не вдалося знайти місця поруч');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setNearbyMessage('Не вдалося визначити ваше місцезнаходження');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    );
  };

  return (
    <div className="flex h-[calc(100dvh-8.5rem)] min-h-[560px] flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-lg">Карта місць</h4>
            <p className="text-xs text-gray-500">Місця у видимій області карти</p>
          </div>
          <Button
            variant="solid"
            type="button"
            loading={locating}
            disabled={locating}
            onClick={handleNearby}
          >
            Поруч зі мною
          </Button>
        </div>

        <CategoryFilter
          value={categories}
          onChange={setCategories}
        />

        {boundsError && <p className="text-sm text-amber-600">{boundsError}</p>}
        {nearbyMessage && <p className="text-sm text-gray-500">{nearbyMessage}</p>}

        <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <Map>
            <PlacesMap
              ref={mapRef}
              places={places}
              categories={categories}
              selectedId={selected?.id ?? null}
              camera={camera}
              onLoaded={handleLoaded}
              onSelect={setSelected}
              onBoundsError={handleBoundsError}
            />
          </Map>
        </div>
      </div>

      <aside className="flex max-h-[45vh] w-full shrink-0 flex-col overflow-y-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:max-h-none lg:w-[380px]">
        {nearby.length > 0 && (
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <h6 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
              Поруч зі мною
            </h6>
            <ul className="flex flex-col gap-1">
              {nearby.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelected(place);
                      setCamera({
                        id: Date.now(),
                        kind: 'point',
                        lat: place.lat,
                        lon: place.lon,
                        zoom: 16,
                      });
                    }}
                  >
                    <span className="truncate text-gray-900 dark:text-gray-100">
                      {placeTitle(place.name, place.category)}
                    </span>
                    <span className="shrink-0 text-gray-500">{formatDistance(place.distance)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selected ? (
          <PlacePanel
            key={selected.id}
            place={selected}
            onUpdated={handleUpdated}
            onClose={() => setSelected(null)}
          />
        ) : (
          <p className="p-4 text-sm text-gray-500">
            Оберіть місце на карті, щоб переглянути відгуки.
          </p>
        )}
      </aside>
    </div>
  );
};

export default PageMap;
