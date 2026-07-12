import { CgMathPlus } from 'react-icons/cg';
import { Button } from '@/components/ui';
import { SIZES } from '@/components/ui/utils/constants';
import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/cars/cars.slice';

export const AddCarButton = () => {
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(openDialog());
  };

  return (
    <Button
      icon={<CgMathPlus />}
      variant={'plain'}
      size={SIZES.SM}
      onClick={onOpen}
    >
      Додати автомобіль
    </Button>
  );
};
