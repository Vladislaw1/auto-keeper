import { useEffect } from 'react';
import { Button, Form, Steps } from '@/components/ui';
import { ADD_CAR_STEP_CONFIG, ADD_CAR_STEPS } from '@/constants/add-car-steps.constant';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getCarCatalogSelectionSelector,
  getSelectedBrandNameSelector,
  getSelectedModelNameSelector,
} from '@/store/slices/car-catalog/car-catalog.selectors';
import { restoreCarCatalogFromFormState } from '@/store/slices/car-catalog/car-catalog.actions';
import { postCreatedCarAction } from '@/store/slices/cars/cars.actions';
import { getAddCarFormStateSelector, getCarsAction } from '@/store/slices/cars/cars.selectors';
import { setFormStep, updateFormState } from '@/store/slices/cars/cars.slice';
import { ICreateCarRequest } from '@/store/slices/cars/cars.type';
import {
  OwnerStep,
  RegistrationStep,
  ReviewStep,
  TechnicalStep,
  VehicleStep,
} from '@/views/cars/components/forms/AddCarForm/steps';
import cn from 'classnames';
import { BsArrowLeft, BsArrowRight, BsPlus } from 'react-icons/bs';

const buildCreateCarRequest = (
  formState: NonNullable<ReturnType<typeof getAddCarFormStateSelector>>,
): ICreateCarRequest => ({
  brand: formState.brand,
  model: formState.model,
  ownerId: formState.ownerId!,
  year: Number(formState.year),
  carNumber: formState.carNumber,
  vin: formState.vin,
  color: formState.color,
  engineCode: formState.engineCode,
  engineVolume: formState.engineVolume,
  mileage: Number(formState.mileage),
  fuelType: formState.fuelType,
  transmission: formState.transmission,
});

type AddCarFormProps = {
  isMobile?: boolean;
};

export const AddCarForm = ({ isMobile = false }: AddCarFormProps) => {
  const dispatch = useAppDispatch();

  const formState = useAppSelector(getAddCarFormStateSelector);
  const { loading, error } = useAppSelector(getCarsAction);
  const { brandId, modelId, ownerId } = useAppSelector(getCarCatalogSelectionSelector);
  const selectedBrandName = useAppSelector(getSelectedBrandNameSelector);
  const selectedModelName = useAppSelector(getSelectedModelNameSelector);

  const step = formState?.step ?? 0;

  useEffect(() => {
    if (!formState) {
      return;
    }

    if (step === ADD_CAR_STEPS.VEHICLE || step === ADD_CAR_STEPS.OWNER) {
      dispatch(restoreCarCatalogFromFormState(formState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, step]);

  const saveCurrentStep = () => {
    if (!formState) {
      return false;
    }

    if (step === ADD_CAR_STEPS.VEHICLE) {
      if (!brandId || !modelId || !formState.year) {
        return false;
      }

      dispatch(
        updateFormState({
          brandId,
          modelId,
          brand: selectedBrandName,
          model: selectedModelName,
        }),
      );
    }

    if (step === ADD_CAR_STEPS.OWNER) {
      if (!ownerId) {
        return false;
      }

      dispatch(updateFormState({ ownerId }));
    }

    return true;
  };

  const handleNext = () => {
    if (!saveCurrentStep() || step >= ADD_CAR_STEPS.REVIEW) {
      return;
    }

    dispatch(setFormStep(step + 1));
  };

  const handleBack = () => {
    if (step > 0) {
      dispatch(setFormStep(step - 1));
    }
  };

  const handleSubmit = () => {
    if (!formState?.ownerId) {
      return;
    }

    dispatch(postCreatedCarAction(buildCreateCarRequest(formState)));
  };

  const renderStepContent = () => {
    switch (step) {
      case ADD_CAR_STEPS.VEHICLE:
        return <VehicleStep hideHeader={isMobile} />;
      case ADD_CAR_STEPS.OWNER:
        return <OwnerStep hideHeader={isMobile} />;
      case ADD_CAR_STEPS.REGISTRATION:
        return <RegistrationStep hideHeader={isMobile} />;
      case ADD_CAR_STEPS.TECHNICAL:
        return <TechnicalStep hideHeader={isMobile} />;
      case ADD_CAR_STEPS.REVIEW:
        return <ReviewStep hideHeader={isMobile} />;
      default:
        return null;
    }
  };

  return (
    <Form
      className="flex h-full min-h-0 flex-1 flex-col"
      containerClassName="flex h-full min-h-0 flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();

        if (step === ADD_CAR_STEPS.REVIEW) {
          handleSubmit();
        } else {
          handleNext();
        }
      }}
    >
      <div className={cn('flex min-h-0 flex-1 items-stretch', isMobile ? 'gap-0' : 'gap-6')}>
        {!isMobile && (
          <Steps
            vertical
            current={step}
            className="sticky top-0 hidden w-[280px] shrink-0 self-start md:block"
            onChange={(index) => {
              if (index < step) {
                saveCurrentStep();
                dispatch(setFormStep(index));
              }
            }}
          >
            {ADD_CAR_STEP_CONFIG.map((stepConfig) => (
              <Steps.Item
                key={stepConfig.key}
                title={
                  <span className="inline-flex items-center gap-2">
                    {stepConfig.icon}
                    {stepConfig.title}
                  </span>
                }
                description={stepConfig.description}
              />
            ))}
          </Steps>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
            {renderStepContent()}
          </div>

          {error && <p className="mt-2 shrink-0 text-sm text-red-500 md:mt-4">{error}</p>}

          <div
            className={cn(
              'mt-auto flex shrink-0 items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 md:pt-4',
            )}
          >
            <Button
              type="button"
              size="sm"
              variant="plain"
              disabled={step === 0}
              icon={<BsArrowLeft />}
              onClick={handleBack}
            >
              Назад
            </Button>

            {step < ADD_CAR_STEPS.REVIEW ? (
              <Button
                type="submit"
                size="sm"
                variant="solid"
                icon={<BsArrowRight />}
                iconAlignment="end"
              >
                Далі
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                variant="solid"
                loading={loading}
                icon={<BsPlus />}
              >
                {isMobile ? 'Додати' : 'Додати автомобіль'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};
