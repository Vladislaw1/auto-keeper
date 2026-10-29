import axios from 'axios';
import type {
  CreateReviewPayload,
  NearbyPlace,
  NearbyPlaceQuery,
  Place,
  PlaceBounds,
  PlaceCategory,
  Review,
} from '@/services/places/places.types';

const PLACES_API_BASE_URL = 'http://localhost:3000';

const placesApi = axios.create({
  baseURL: PLACES_API_BASE_URL,
});

const reviewsPath = (id: string) => `/places/${encodeURIComponent(id)}/reviews`;

const asList = <T>(data: unknown): T[] => (Array.isArray(data) ? (data as T[]) : []);

const withCategory = (categories?: PlaceCategory[]) =>
  categories && categories.length > 0 ? { category: categories.join(',') } : {};

const withCoordinates = <T extends { lat: number; lon: number }>(items: T[]) =>
  items.filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon));

export const placesService = {
  async getInBounds(
    bounds: PlaceBounds,
    categories: PlaceCategory[] = [],
    signal?: AbortSignal,
  ): Promise<Place[]> {
    const { data } = await placesApi.get<Place[]>('/places', {
      params: {
        ...bounds,
        ...withCategory(categories),
      },
      signal,
    });

    return withCoordinates(asList<Place>(data)).slice(0, 500);
  },

  async getNearby(query: NearbyPlaceQuery, signal?: AbortSignal): Promise<NearbyPlace[]> {
    const { categories, ...point } = query;
    const { data } = await placesApi.get<NearbyPlace[]>('/places/nearby', {
      params: {
        ...point,
        ...withCategory(categories),
      },
      signal,
    });

    return withCoordinates(asList<NearbyPlace>(data));
  },

  async getReviews(id: string, signal?: AbortSignal): Promise<Review[]> {
    const { data } = await placesApi.get<Review[]>(reviewsPath(id), { signal });
    return asList<Review>(data);
  },

  async createReview(id: string, payload: CreateReviewPayload): Promise<Place> {
    const { data } = await placesApi.post<Place>(reviewsPath(id), payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  },
};
