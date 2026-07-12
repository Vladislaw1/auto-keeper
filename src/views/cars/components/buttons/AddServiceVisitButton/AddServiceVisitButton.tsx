import { Button } from '@/components/ui';
import { SIZES } from '@/components/ui/utils/constants';
import { useAppDispatch } from '@/store/hooks';
import { openAddVisitDialog } from '@/store/slices/cars/cars.slice';
import { ICar } from '@/store/slices/cars/cars.type';
import { MdMiscellaneousServices } from 'react-icons/md';
import type { MouseEvent } from 'react';
import cn from 'classnames';

type AddServiceVisitButtonProps = {
  car: ICar;
  size?: (typeof SIZES)[keyof typeof SIZES];
  stopPropagation?: boolean;
  compact?: boolean;
};

export const AddServiceVisitButton = ({
  car,
  size = SIZES.XS,
  stopPropagation = false,
  compact = false,
}: AddServiceVisitButtonProps) => {
  const dispatch = useAppDispatch();

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    dispatch(openAddVisitDialog(car));
  };

  return (
    <Button
      icon={<MdMiscellaneousServices />}
      variant="plain"
      size={size}
      onClick={onOpen}
      className={cn(compact && 'px-2')}
      aria-label="Додати візит"
    >
      {!compact && 'Додати візит'}
    </Button>
  );
};
