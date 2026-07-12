import { Dialog } from '@/components/ui';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWorkTypesAction } from '@/store/slices/work-catalog/work-catalog.actions';
import {
  getAddServiceVisitFormStateSelector,
  getServiceVisitActionSelector,
} from '@/store/slices/cars/cars.selectors';
import { closeAddVisitDialog } from '@/store/slices/cars/cars.slice';
import { AddServiceVisitForm } from '@/views/cars/components/forms/AddServiceVisitForm';
import useResponsive from '@/utils/hooks/useResponsive';
import cn from 'classnames';

export const AddServiceVisitDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpened, selectedCar } = useAppSelector(getServiceVisitActionSelector);
  const formState = useAppSelector(getAddServiceVisitFormStateSelector);
  const { smaller } = useResponsive();

  const isMobile = smaller.md;

  useEffect(() => {
    if (isOpened) {
      dispatch(fetchWorkTypesAction());
    }
  }, [dispatch, isOpened]);

  const onClose = () => {
    dispatch(closeAddVisitDialog());
  };

  const title = selectedCar
    ? isMobile
      ? `Візит · ${selectedCar.brand} ${selectedCar.model}`
      : `Додати візит — ${selectedCar.brand} ${selectedCar.model}`
    : 'Додати візит';

  return (
    <Dialog
      isOpen={isOpened}
      width={isMobile ? undefined : 760}
      height={isMobile ? 'min(100dvh - 2rem, 720px)' : 720}
      onClose={onClose}
      onRequestClose={onClose}
      contentClassName={cn(isMobile && 'p-4')}
    >
      <Dialog.Header className={cn(isMobile && 'pb-2')}>
        <h5 className="truncate text-base font-semibold sm:text-lg">{title}</h5>
      </Dialog.Header>
      <Dialog.Body className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        {formState && <AddServiceVisitForm />}
      </Dialog.Body>
    </Dialog>
  );
};
