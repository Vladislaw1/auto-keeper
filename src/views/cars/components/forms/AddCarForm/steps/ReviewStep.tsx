import { StepLayout } from '@/views/cars/components/forms/AddCarForm/steps/StepLayout';
import { CarDetailsCards } from '@/views/cars/components/entities/CarDetailsCards';
import { useAppSelector } from '@/store/hooks';
import { getOwnerOptionsSelector } from '@/store/slices/car-catalog/car-catalog.selectors';
import { getAddCarFormStateSelector } from '@/store/slices/cars/cars.selectors';

export const ReviewStep = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const formState = useAppSelector(getAddCarFormStateSelector);
  const ownerOptions = useAppSelector(getOwnerOptionsSelector);

  const ownerName =
    ownerOptions.find((option) => option.value === formState?.ownerId)?.label ?? '';

  return (
    <StepLayout
      hideHeader={hideHeader}
      title="Перевірка даних"
      description="Переконайтесь, що всі дані введені правильно"
    >
      <CarDetailsCards
        showServiceVisits={false}
        data={{
          brand: formState?.brand ?? '',
          model: formState?.model ?? '',
          year: formState?.year ?? '',
          ownerName,
          carNumber: formState?.carNumber ?? '',
          vin: formState?.vin ?? '',
          color: formState?.color ?? '',
          engineCode: formState?.engineCode ?? '',
          engineVolume: formState?.engineVolume ?? '',
          mileage: formState?.mileage ?? '',
          fuelType: formState?.fuelType ?? '',
          transmission: formState?.transmission ?? '',
          photos: [],
        }}
      />
    </StepLayout>
  );
};
