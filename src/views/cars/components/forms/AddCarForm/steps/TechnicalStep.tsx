import { FormItem, Input, Select } from '@/components/ui';
import {
  CarSelectOption,
  FUEL_TYPE_OPTIONS,
  FuelType,
  Transmission,
  TRANSMISSION_OPTIONS,
} from '@/constants/cars.constant';
import { StepLayout } from '@/views/cars/components/forms/AddCarForm/steps/StepLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAddCarFormStateSelector } from '@/store/slices/cars/cars.selectors';
import { updateFormState } from '@/store/slices/cars/cars.slice';
import { IAddCarFormState } from '@/store/slices/cars/cars.type';

type TechnicalField = keyof Pick<
  IAddCarFormState,
  'engineCode' | 'engineVolume' | 'fuelType' | 'transmission'
>;

export const TechnicalStep = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getAddCarFormStateSelector);

  const updateField = <K extends TechnicalField>(field: K, value: IAddCarFormState[K]) => {
    dispatch(updateFormState({ [field]: value }));
  };

  const handleMileageChange = (value: string) => {
    const mileage = value === '' ? '' : Number(value);
    dispatch(updateFormState({ mileage }));
  };

  return (
    <StepLayout
      hideHeader={hideHeader}
      title="Технічні характеристики"
      description="Двигун, пробіг та тип трансмісії"
    >
      <div className="grid max-w-lg grid-cols-1 gap-4">
        <FormItem
          label="Код двигуна"
          className="mb-0"
        >
          <Input
            size="sm"
            value={formState?.engineCode ?? ''}
            onChange={(event) => updateField('engineCode', event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Об'єм двигуна"
          className="mb-0"
        >
          <Input
            size="sm"
            value={formState?.engineVolume ?? ''}
            onChange={(event) => updateField('engineVolume', event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Пробіг"
          className="mb-0"
        >
          <Input
            size="sm"
            type="number"
            min={0}
            value={formState?.mileage ?? ''}
            onChange={(event) => handleMileageChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Тип палива"
          className="mb-0"
        >
          <Select<CarSelectOption<FuelType>>
            usePortal
            options={FUEL_TYPE_OPTIONS}
            value={FUEL_TYPE_OPTIONS.filter((option) => option.value === formState?.fuelType)}
            size="sm"
            onChange={(option) => updateField('fuelType', option?.value ?? '')}
          />
        </FormItem>
        <FormItem
          label="Тип коробки передач"
          className="mb-0"
        >
          <Select<CarSelectOption<Transmission>>
            isClearable
            usePortal
            options={TRANSMISSION_OPTIONS}
            value={TRANSMISSION_OPTIONS.filter(
              (option) => option.value === formState?.transmission,
            )}
            size="sm"
            onChange={(option) => updateField('transmission', option?.value ?? '')}
          />
        </FormItem>
      </div>
    </StepLayout>
  );
};
