import { Dialog } from '@/components/ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCarsAction } from '@/store/slices/cars/cars.selectors';
import { useAppDispatch } from '@/store/hooks';
import { closeDialog } from '@/store/slices/cars/cars.slice';
import { resetCarCatalogSelection } from '@/store/slices/car-catalog/car-catalog.actions';
import { AddCarForm } from '@/views/cars/components';

export const AddCarDialog = () => {
  const dispatch = useAppDispatch();

  const { isOpened } = useSelector(getCarsAction);

  useEffect(() => {
    if (!isOpened) {
      dispatch(resetCarCatalogSelection());
    }
  }, [dispatch, isOpened]);

  const onClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      isOpen={isOpened}
      width={1000}
      height={640}
      onClose={onClose}
      onRequestClose={onClose}
    >
      <Dialog.Header>
        <h5>Додати автомобіль</h5>
      </Dialog.Header>
      <Dialog.Body className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <AddCarForm />
      </Dialog.Body>
    </Dialog>
  );
};
