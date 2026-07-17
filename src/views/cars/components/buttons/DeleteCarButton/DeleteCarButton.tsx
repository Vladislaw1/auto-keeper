import { useAppDispatch } from '@/store/hooks';
import { Button } from '@/components/ui';
import cn from 'classnames';
import { BiTrash } from 'react-icons/bi';
import { SIZES } from '@/components/ui/utils/constants';
import { ICar } from '@/store/slices/cars/cars.type';
import type { MouseEvent } from 'react';
import { deleteCarAction } from '@/store/slices/cars/cars.actions';

type DeleteCarButtonProps = {
  car: ICar;
  size?: (typeof SIZES)[keyof typeof SIZES];
  stopPropagation?: boolean;
  compact?: boolean;
};

export const DeleteCarButton = ({
  car,
  size = SIZES.XS,
  stopPropagation = false,
  compact = false,
}: DeleteCarButtonProps) => {
  const dispatch = useAppDispatch();

  const onDelete = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    dispatch(deleteCarAction(car?.id));
  };

  return (
    <Button
      icon={<BiTrash />}
      variant="plain"
      size={size}
      className={cn(compact && 'px-2')}
      aria-label="Видалити автомобіль"
      onClick={onDelete}
    >
      Видалити автомобіль
    </Button>
  );
};
