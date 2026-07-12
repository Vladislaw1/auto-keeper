import { Dialog } from '@/components/ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ADD_CAR_STEP_CONFIG,
  ADD_CAR_STEPS_COUNT,
} from '@/constants/add-car-steps.constant';
import { getAddCarFormStateSelector, getCarsAction } from '@/store/slices/cars/cars.selectors';
import { useAppDispatch } from '@/store/hooks';
import { closeDialog } from '@/store/slices/cars/cars.slice';
import { resetCarCatalogSelection } from '@/store/slices/car-catalog/car-catalog.actions';
import { AddCarForm } from '@/views/cars/components';
import useResponsive from '@/utils/hooks/useResponsive';
import cn from 'classnames';

export const AddCarDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useSelector(getCarsAction);
  const formState = useSelector(getAddCarFormStateSelector);
  const { smaller } = useResponsive();

  const step = formState?.step ?? 0;
  const stepConfig = ADD_CAR_STEP_CONFIG[step];
  const isMobile = smaller.md;

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
      width={isMobile ? undefined : 1000}
      height={isMobile ? 'min(100dvh - 2rem, 640px)' : 640}
      onClose={onClose}
      onRequestClose={onClose}
      contentClassName={cn(isMobile && 'p-4')}
    >
      <Dialog.Header className={cn(isMobile && 'pb-2')}>
        {isMobile && stepConfig ? (
          <div className="flex min-w-0 flex-col gap-1 pr-8">
            <div className="flex items-center gap-2">
              <span className="text-lg text-primary">{stepConfig.icon}</span>
              <h5 className="truncate text-base font-semibold">{stepConfig.title}</h5>
            </div>
            <p className="text-xs text-gray-500">
              Крок {step + 1} з {ADD_CAR_STEPS_COUNT} · {stepConfig.description}
            </p>
          </div>
        ) : (
          <h5>Додати автомобіль</h5>
        )}
      </Dialog.Header>
      <Dialog.Body className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <AddCarForm isMobile={isMobile} />
      </Dialog.Body>
    </Dialog>
  );
};
