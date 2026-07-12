import { FormItem, Input } from '@/components/ui';
import { BrandModelSelects } from '@/views/cars/components/forms/BrandModelSelects';
import { StepLayout } from '@/views/cars/components/forms/AddCarForm/steps/StepLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAddCarFormStateSelector } from '@/store/slices/cars/cars.selectors';
import { updateFormState } from '@/store/slices/cars/cars.slice';

export const VehicleStep = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getAddCarFormStateSelector);

  const handleYearChange = (value: string) => {
    const year = value === '' ? '' : Number(value);
    dispatch(updateFormState({ year }));
  };

  return (
    <StepLayout
      title="Основна інформація"
      description="Вкажіть марку, модель та рік випуску автомобіля"
    >
      <div className="grid grid-cols-1 gap-4">
        <BrandModelSelects />
        <FormItem
          label="Рік випуску"
          className="mb-0"
        >
          <Input
            type="number"
            size="sm"
            value={formState?.year ?? ''}
            placeholder="Наприклад, 2020"
            onChange={(event) => handleYearChange(event.target.value)}
          />
        </FormItem>
      </div>
    </StepLayout>
  );
};
