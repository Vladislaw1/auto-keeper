import type { IconType } from 'react-icons';
import { PiDropBold, PiGearBold, PiTireBold, PiWrenchBold } from 'react-icons/pi';
import { PlaceCategory } from '@/services/places';

export const PLACE_CATEGORIES: Array<{ id: PlaceCategory; label: string; color: string }> = [
  { id: 'CAR_REPAIR', label: 'СТО', color: '#2a85ff' },
  { id: 'TYRES', label: 'Шини', color: '#f59e0b' },
  { id: 'CAR_WASH', label: 'Мийка', color: '#06b6d4' },
  { id: 'CAR_PARTS', label: 'Запчастини', color: '#7c3aed' },
];

const categoryById = Object.fromEntries(PLACE_CATEGORIES.map((item) => [item.id, item])) as Record<
  PlaceCategory,
  (typeof PLACE_CATEGORIES)[number]
>;

export const categoryLabel = (category: PlaceCategory) => categoryById[category]?.label ?? 'Місце';

export const categoryColor = (category: PlaceCategory) =>
  categoryById[category]?.color ?? '#64748b';

export const categoryIcon: Record<PlaceCategory, IconType> = {
  CAR_REPAIR: PiWrenchBold,
  TYRES: PiTireBold,
  CAR_WASH: PiDropBold,
  CAR_PARTS: PiGearBold,
};

export const placeTitle = (name: string | null, category: PlaceCategory) =>
  name?.trim() || categoryLabel(category);

export const formatDistance = (meters: number) => {
  if (meters < 1000) return `${Math.round(meters)} м`;
  const kilometers = meters / 1000;
  return `${kilometers.toFixed(kilometers < 10 ? 1 : 0)} км`;
};

export const formatRating = (ratingAvg: number, ratingCount: number) =>
  `${ratingAvg.toFixed(1)} · ${ratingCount}`;

export const websiteHref = (website: string) =>
  /^https?:\/\//i.test(website) ? website : `https://${website}`;
