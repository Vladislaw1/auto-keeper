import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { getAllOwnersAction } from '@/store/slices/owners/owners.actions';
import { useSelector } from 'react-redux';
import { getCarsSelector } from '@/store/slices/cars/cars.selectors';
import { AddCarButton } from '@/views/cars/components/buttons';
import { AddCarDialog, AddServiceVisitDialog, CarDetailsDrawer } from '@/views/cars/components';
import { WrapperPage } from '@/components/custom';
import { OwnersLists } from '@/views/owners/components';

const Owners = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector(getCarsSelector);

  useEffect(() => {
    dispatch(getAllOwnersAction());
  }, [dispatch]);

  return (
    <WrapperPage
      loading={loading}
      error={error}
      header={'Валсники'}
      desc={'Список власників автомобілів'}
      side={<AddCarButton />}
    >
      <div>
        <OwnersLists />
      </div>
      <AddCarDialog />
      <AddServiceVisitDialog />
      <CarDetailsDrawer />
    </WrapperPage>
  );
};

export default Owners;
