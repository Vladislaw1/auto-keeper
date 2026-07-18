import { Dialog } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getAddOwnerFormStateSelector,
  getOwnersActionSelector,
} from '@/store/slices/owners/owners.selectors';
import { closeDialog } from '@/store/slices/owners/owners.slice';
import { AddOwnerForm } from '@/views/owners/components/forms/AddOwnerForm';
import useResponsive from '@/utils/hooks/useResponsive';
import cn from 'classnames';

export const AddOwnerDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useAppSelector(getOwnersActionSelector);
  const formState = useAppSelector(getAddOwnerFormStateSelector);
  const { smaller } = useResponsive();

  const isMobile = smaller.md;

  const onClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      isOpen={isOpened}
      width={isMobile ? undefined : 480}
      height={isMobile ? 'min(100dvh - 2rem, 360px)' : 320}
      onClose={onClose}
      onRequestClose={onClose}
      contentClassName={cn(isMobile && 'p-4')}
    >
      <Dialog.Header className={cn(isMobile && 'pb-2')}>
        <h5 className="truncate text-base font-semibold sm:text-lg">Додати власника</h5>
      </Dialog.Header>
      <Dialog.Body className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        {formState && <AddOwnerForm />}
      </Dialog.Body>
    </Dialog>
  );
};
