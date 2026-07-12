import { OwnerSelect } from '@/views/cars/components/forms/OwnerSelect';
import { StepLayout } from '@/views/cars/components/forms/AddCarForm/steps/StepLayout';

export const OwnerStep = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  return (
    <StepLayout
      hideHeader={hideHeader}
      title="Власник автомобіля"
      description="Оберіть власника зі списку зареєстрованих користувачів"
    >
      <div className="max-w-md">
        <OwnerSelect />
      </div>
    </StepLayout>
  );
};
