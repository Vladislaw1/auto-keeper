import { FormItem, Input } from '@/components/ui';
import { StepLayout } from '@/views/cars/components/forms/AddCarForm/steps/StepLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAddCarFormStateSelector } from '@/store/slices/cars/cars.selectors';
import { updateFormState } from '@/store/slices/cars/cars.slice';
import { IAddCarFormState } from '@/store/slices/cars/cars.type';

type RegistrationField = keyof Pick<IAddCarFormState, 'carNumber' | 'vin' | 'color'>;

export const RegistrationStep = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getAddCarFormStateSelector);

  const updateField = <K extends RegistrationField>(field: K, value: IAddCarFormState[K]) => {
    dispatch(updateFormState({ [field]: value }));
  };

  return (
    <StepLayout
      hideHeader={hideHeader}
      title="Реєстраційні дані"
      description="Номерний знак, VIN-код та колір кузова"
    >
      <div className="grid max-w-lg grid-cols-1 gap-4">
        <FormItem
          label="Номерний знак"
          className="mb-0"
        >
          <Input
            size="sm"
            value={formState?.carNumber ?? ''}
            onChange={(event) => updateField('carNumber', event.target.value)}
          />
        </FormItem>
        <FormItem
          label="VIN"
          className="mb-0"
        >
          <Input
            size="sm"
            value={formState?.vin ?? ''}
            onChange={(event) => updateField('vin', event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Колір"
          className="mb-0"
        >
          <Input
            size="sm"
            value={formState?.color ?? ''}
            onChange={(event) => updateField('color', event.target.value)}
          />
        </FormItem>
      </div>
    </StepLayout>
  );
};
