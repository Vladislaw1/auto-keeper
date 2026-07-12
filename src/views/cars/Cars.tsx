import { useAppDispatch } from '@/store/hooks';
import { getCarsListAction } from '@/store/slices/cars/cars.actions';
import { useEffect } from 'react';
import { WrapperPage } from '@/components/custom';
import { useSelector } from 'react-redux';
import { getCarsSelector } from '@/store/slices/cars/cars.selectors';
import { AddCarDialog, AddServiceVisitDialog, CarDetailsDrawer, CarsList } from '@/views/cars/components';
import { AddCarButton } from '@/views/cars/components/buttons';

const Cars = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector(getCarsSelector);

  useEffect(() => {
    dispatch(getCarsListAction());
  }, [dispatch]);

  return (
    <WrapperPage
      loading={loading}
      error={error}
      header={'Автомобілі'}
      desc={'Список автомобілів з історією'}
      side={<AddCarButton />}
    >
      <div>
        <CarsList />
      </div>
      <AddCarDialog />
      <AddServiceVisitDialog />
      <CarDetailsDrawer />
    </WrapperPage>
  );
};

export default Cars;
