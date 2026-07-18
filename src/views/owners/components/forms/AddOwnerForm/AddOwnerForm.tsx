import { useState } from 'react';
import { Button, Form, FormItem, Input } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postCreatedOwnerAction } from '@/store/slices/owners/owners.actions';
import {
  getAddOwnerFormStateSelector,
  getOwnersActionSelector,
} from '@/store/slices/owners/owners.selectors';
import { updateFormState } from '@/store/slices/owners/owners.slice';
import { IAddOwnerFormState, ICreateOwnerRequest } from '@/store/slices/owners/owners.types';

const buildCreateOwnerRequest = (formState: IAddOwnerFormState): ICreateOwnerRequest => ({
  first_name: formState.first_name.trim(),
  last_name: formState.last_name.trim(),
});

const validateForm = (formState: IAddOwnerFormState): string | null => {
  if (!formState.last_name.trim()) {
    return 'Вкажіть прізвище';
  }

  if (!formState.first_name.trim()) {
    return "Вкажіть ім'я";
  }

  return null;
};

export const AddOwnerForm = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getAddOwnerFormStateSelector);
  const { loading, error } = useAppSelector(getOwnersActionSelector);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!formState) {
    return null;
  }

  const handleSubmit = () => {
    const nextValidationError = validateForm(formState);
    setValidationError(nextValidationError);

    if (nextValidationError) {
      return;
    }

    dispatch(postCreatedOwnerAction(buildCreateOwnerRequest(formState)));
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
          <FormItem
            label="Прізвище"
            className="mb-0"
          >
            <Input
              size="sm"
              value={formState.last_name}
              onChange={(event) =>
                dispatch(updateFormState({ last_name: event.target.value }))
              }
            />
          </FormItem>
          <FormItem
            label="Ім'я"
            className="mb-0"
          >
            <Input
              size="sm"
              value={formState.first_name}
              onChange={(event) =>
                dispatch(updateFormState({ first_name: event.target.value }))
              }
            />
          </FormItem>
        </div>
        {displayError && <p className="mt-3 shrink-0 text-sm text-error">{displayError}</p>}
        <div className="mt-4 flex shrink-0 justify-end pt-4">
          <Button
            variant="solid"
            type="submit"
            loading={loading}
            size="xs"
          >
            Зберегти власника
          </Button>
        </div>
      </div>
    </Form>
  );
};
