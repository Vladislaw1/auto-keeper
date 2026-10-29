export type PlaceCategory = 'CAR_REPAIR' | 'TYRES' | 'CAR_WASH' | 'CAR_PARTS';

export type Place = {
  id: string;
  category: PlaceCategory;
  lat: number;
  lon: number;
  name: string | null;
  phone: string | null;
  hours: string | null;
  website: string | null;
  address: string | null;
  ratingAvg: number;
  ratingCount: number;
};

export type NearbyPlace = Place & {
  distance: number;
};

export type PlaceBounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

export type NearbyPlaceQuery = {
  lat: number;
  lon: number;
  radius?: number;
  limit?: number;
  categories?: PlaceCategory[];
};

export type Review = {
  id: string;
  placeId: string;
  userId: string;
  rating: number;
  text: string | null;
  createdAt: string;
};

export type CreateReviewPayload = {
  rating: number;
  text?: string;
};
