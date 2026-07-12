import { useAppSelector } from '@/store/hooks';
import { getCarDrawerSelector } from '@/store/slices/cars/cars.selectors';
import { ServiceVisit } from '@/views/cars/components';
import cn from 'classnames';

export const ServiceVisitsList = () => {
  const { selectedCar } = useAppSelector(getCarDrawerSelector);

  const visits = selectedCar?.serviceVisits;

  return (
    <div className={cn('flex flex-col gap-4')}>
      {visits?.map((visit) => (
        <ServiceVisit
          key={visit?.id}
          visit={visit}
        />
      ))}
    </div>
  );
};
