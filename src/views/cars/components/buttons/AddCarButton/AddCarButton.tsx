import { CgMathPlus } from 'react-icons/cg';
import { Button } from '@/components/ui';
import { SIZES } from '@/components/ui/utils/constants';
import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/cars/cars.slice';
import useResponsive from '@/utils/hooks/useResponsive';

export const AddCarButton = () => {
  const dispatch = useAppDispatch();
  const { smaller } = useResponsive();

  const onOpen = () => {
    dispatch(openDialog());
  };

  return (
    <Button
      icon={<CgMathPlus />}
      variant="plain"
      size={SIZES.SM}
      onClick={onOpen}
    >
      {smaller.sm ? 'Додати' : 'Додати автомобіль'}
    </Button>
  );
};
