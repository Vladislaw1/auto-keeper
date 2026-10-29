import { PlaceCategory } from '@/services/places';
import { categoryIcon, PLACE_CATEGORIES } from '@/views/map/formatPlace';

type CategoryFilterProps = {
  value: PlaceCategory[];
  onChange: (categories: PlaceCategory[]) => void;
};

export const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  const allSelected = value.length === 0;

  const toggle = (category: PlaceCategory) => {
    onChange(
      value.includes(category) ? value.filter((item) => item !== category) : [...value, category],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={allSelected}
        className={`rounded-full border px-3 py-1 text-sm ${
          allSelected
            ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
            : 'border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300'
        }`}
        onClick={() => {
          if (value.length) onChange([]);
        }}
      >
        Усі
      </button>
      {PLACE_CATEGORIES.map((category) => {
        const active = value.includes(category.id);
        const Icon = categoryIcon[category.id];
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={active}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
              active
                ? 'border-transparent text-white'
                : 'border-gray-200 text-gray-700 dark:border-gray-600 dark:text-gray-200'
            }`}
            style={
              active ? { backgroundColor: category.color, borderColor: category.color } : undefined
            }
            onClick={() => toggle(category.id)}
          >
            <Icon
              size={15}
              color={active ? '#ffffff' : category.color}
            />
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
