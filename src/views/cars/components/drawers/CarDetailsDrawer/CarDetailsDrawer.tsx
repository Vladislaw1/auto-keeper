import { Drawer } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCarDrawerSelector } from '@/store/slices/cars/cars.selectors';
import { closeCarDrawer } from '@/store/slices/cars/cars.slice';
import { AddServiceVisitButton } from '@/views/cars/components/buttons';
import { CarDetailsCards, mapCarToDetails } from '@/views/cars/components/entities/CarDetailsCards';
import useResponsive from '@/utils/hooks/useResponsive';

export const CarDetailsDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpened, selectedCar } = useAppSelector(getCarDrawerSelector);
  const { smaller } = useResponsive();

  const onClose = () => {
    dispatch(closeCarDrawer());
  };

  const title = selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : 'Автомобіль';

  return (
    <Drawer
      isOpen={isOpened}
      placement="right"
      width={smaller.md ? '100%' : 480}
      title={title}
      onClose={onClose}
      onRequestClose={onClose}
      footer={
        selectedCar ? (
          <div className="flex justify-end">
            <AddServiceVisitButton car={selectedCar} />
          </div>
        ) : null
      }
    >
      {selectedCar && <CarDetailsCards data={mapCarToDetails(selectedCar)} />}
    </Drawer>
  );
};
