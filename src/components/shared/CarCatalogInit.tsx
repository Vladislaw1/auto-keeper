import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBrandsAction, fetchOwnersAction } from '@/store/slices/car-catalog/car-catalog.actions';
import {
  getCarCatalogBrandsSelector,
  getCarCatalogOwnersSelector,
} from '@/store/slices/car-catalog/car-catalog.selectors';

const CarCatalogInit = () => {
  const dispatch = useAppDispatch();
  const { data: brands, loading: brandsLoading } = useAppSelector(getCarCatalogBrandsSelector);
  const { data: owners, loading: ownersLoading } = useAppSelector(getCarCatalogOwnersSelector);

  useEffect(() => {
    if (!brands && !brandsLoading) {
      dispatch(fetchBrandsAction());
    }
  }, [brands, brandsLoading, dispatch]);

  useEffect(() => {
    if (!owners && !ownersLoading) {
      dispatch(fetchOwnersAction());
    }
  }, [owners, ownersLoading, dispatch]);

  return null;
};

export default CarCatalogInit;
