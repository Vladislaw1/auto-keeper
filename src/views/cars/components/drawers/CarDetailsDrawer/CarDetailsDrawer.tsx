import { Drawer } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCarDrawerSelector } from '@/store/slices/cars/cars.selectors';
import { closeCarDrawer } from '@/store/slices/cars/cars.slice';
import { CarDetailsCards, mapCarToDetails } from '@/views/cars/components/entities/CarDetailsCards';

export const CarDetailsDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpened, selectedCar } = useAppSelector(getCarDrawerSelector);

  const onClose = () => {
    dispatch(closeCarDrawer());
  };

  const title = selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : 'Автомобіль';

  return (
    <Drawer
      isOpen={isOpened}
      placement="right"
      width={480}
      title={title}
      onClose={onClose}
      onRequestClose={onClose}
    >
      {selectedCar && <CarDetailsCards data={mapCarToDetails(selectedCar)} />}
    </Drawer>
  );
};
