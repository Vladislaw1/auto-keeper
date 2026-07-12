import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, FormItem, Input } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postServiceVisitAction } from '@/store/slices/cars/cars.actions';
import {
  getAddServiceVisitFormStateSelector,
  getServiceVisitActionSelector,
} from '@/store/slices/cars/cars.selectors';
import { addServiceVisitItem, updateServiceVisitFormState } from '@/store/slices/cars/cars.slice';
import {
  IAddServiceVisitFormState,
  ICreateServiceVisitRequest,
} from '@/store/slices/cars/cars.type';
import { ServiceVisitItem } from '@/views/cars/components/entities/ServiceVisitItem';
import { BsPlus } from 'react-icons/bs';

const buildCreateServiceVisitRequest = (
  formState: IAddServiceVisitFormState,
): ICreateServiceVisitRequest => {
  const payload: ICreateServiceVisitRequest = {
    carId: formState.carId,
    date: dayjs(formState.date).toISOString(),
    mileage: Number(formState.mileage),
    items: formState.items.map((item) => ({
      workTypeId: item.workTypeId,
      ...(item.price !== '' ? { price: Number(item.price) } : {}),
      ...(item.note ? { note: item.note } : {}),
    })),
  };

  if (formState.notes) {
    payload.notes = formState.notes;
  }

  if (formState.totalCost !== '') {
    payload.totalCost = Number(formState.totalCost);
  }

  return payload;
};

const validateForm = (formState: IAddServiceVisitFormState): string | null => {
  if (!formState.date) {
    return 'Вкажіть дату та час візиту';
  }

  if (formState.mileage === '' || Number(formState.mileage) < 0) {
    return 'Вкажіть коректний пробіг';
  }

  if (!formState.items.length) {
    return 'Додайте хоча б одну роботу';
  }

  const workTypeIds = formState.items.map((item) => item.workTypeId);
  if (workTypeIds.some((id) => !id)) {
    return 'Оберіть тип роботи для кожного рядка';
  }

  if (new Set(workTypeIds).size !== workTypeIds.length) {
    return 'Типи робіт не можуть повторюватися';
  }

  if (formState.items.some((item) => item.price !== '' && Number(item.price) < 0)) {
    return "Вартість роботи не може бути від'ємною";
  }

  if (formState.totalCost !== '' && Number(formState.totalCost) < 0) {
    return "Загальна вартість не може бути від'ємною";
  }

  return null;
};

export const AddServiceVisitForm = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getAddServiceVisitFormStateSelector);
  const { loading, error } = useAppSelector(getServiceVisitActionSelector);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!formState) {
    return null;
  }

  const handleMileageChange = (value: string) => {
    const mileage = value === '' ? '' : Number(value);
    dispatch(updateServiceVisitFormState({ mileage }));
  };

  const handleTotalCostChange = (value: string) => {
    const totalCost = value === '' ? '' : Number(value);
    dispatch(updateServiceVisitFormState({ totalCost }));
  };

  const handleSubmit = () => {
    const nextValidationError = validateForm(formState);
    setValidationError(nextValidationError);

    if (nextValidationError) {
      return;
    }

    dispatch(postServiceVisitAction(buildCreateServiceVisitRequest(formState)));
  };

  const displayError = error ?? validationError;

  return (
    <Form
      className="flex h-full min-h-0 flex-1 flex-col"
      containerClassName="flex h-full min-h-0 flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormItem
              label="Дата та час візиту"
              className="mb-0"
            >
              <DatePicker.DateTimepicker
                size="sm"
                amPm={false}
                inputFormat="DD.MM.YYYY HH:mm"
                okButtonContent="Готово"
                placeholder="Оберіть дату та час"
                value={formState.date}
                onChange={(value) =>
                  dispatch(updateServiceVisitFormState({ date: value }))
                }
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
                value={formState.mileage}
                onChange={(event) => handleMileageChange(event.target.value)}
              />
            </FormItem>
          </div>
          <FormItem
            label="Загальна вартість"
            className="mb-0"
          >
            <Input
              size="sm"
              type="number"
              min={0}
              placeholder="Розрахується автоматично, якщо не вказано"
              value={formState.totalCost}
              onChange={(event) => handleTotalCostChange(event.target.value)}
            />
          </FormItem>
          <FormItem
            label="Примітки"
            className="mb-0"
          >
            <Input
              textArea
              rows={1}
              value={formState.notes}
              onChange={(event) =>
                dispatch(updateServiceVisitFormState({ notes: event.target.value }))
              }
            />
          </FormItem>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h6 className="mb-0">Виконані роботи</h6>
              <Button
                size="xs"
                variant="plain"
                type="button"
                icon={<BsPlus />}
                onClick={() => dispatch(addServiceVisitItem())}
              >
                Додати роботу
              </Button>
            </div>
            {formState.items.map((item, index) => (
              <ServiceVisitItem
                key={index}
                index={index}
                item={item}
                canRemove={formState.items.length > 1}
              />
            ))}
          </div>
        </div>
        {displayError && <p className="mt-3 shrink-0 text-sm text-error">{displayError}</p>}
        <div className="mt-4 flex shrink-0 justify-end pt-4 ">
          <Button
            variant="solid"
            type="submit"
            loading={loading}
            size={'xs'}
          >
            Зберегти візит
          </Button>
        </div>
      </div>
    </Form>
  );
};
