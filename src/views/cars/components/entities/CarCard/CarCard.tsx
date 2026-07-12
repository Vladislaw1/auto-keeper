import { ReviewRow } from '@/components/custom';
import { ICar } from '@/store/slices/cars/cars.type';
import { AddServiceVisitButton } from '@/views/cars/components/buttons';
import cn from 'classnames';

type CarCardProps = {
  car: ICar;
  onOpen: (car: ICar) => void;
};

export const CarCard = ({ car, onOpen }: CarCardProps) => {
  const ownerName = `${car.owner.first_name} ${car.owner.last_name}`;

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors',
        'hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600',
      )}
      onClick={() => onOpen(car)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(car);
        }
      }}
    >
      <div className={cn('mb-3 flex items-start justify-between gap-2')}>
        <div className="min-w-0">
          <h6 className="truncate text-base font-semibold">
            {car.brand} {car.model}
          </h6>
          <p className="text-xs text-gray-500">{ownerName}</p>
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <AddServiceVisitButton
            car={car}
            compact
          />
        </div>
      </div>
      <div className={cn('flex flex-col gap-0.5')}>
        <ReviewRow
          label="Рік"
          value={car.year ? String(car.year) : 'невказано'}
        />
        <ReviewRow
          label="Номер"
          value={car.carNumber || 'невказано'}
        />
      </div>
    </div>
  );
};
