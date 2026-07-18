import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllOwnersAction } from '@/store/slices/owners/owners.actions';
import { getOwnersSelector } from '@/store/slices/owners/owners.selectors';
import { WrapperPage } from '@/components/custom';
import { AddOwnerButton, AddOwnerDialog, OwnersLists } from '@/views/owners/components';

const Owners = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(getOwnersSelector);

  useEffect(() => {
    dispatch(getAllOwnersAction());
  }, [dispatch]);

  return (
    <WrapperPage
      loading={loading}
      error={error}
      header={'Власники'}
      desc={'Список власників автомобілів'}
      side={<AddOwnerButton />}
    >
      <div>
        <OwnersLists />
      </div>
      <AddOwnerDialog />
    </WrapperPage>
  );
};

export default Owners;
