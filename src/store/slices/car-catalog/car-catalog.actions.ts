import { createAsyncThunk } from '@reduxjs/toolkit';
import { carCatalogServices } from '@/services/car-catalog';
import { ICarBrand, ICarModel, IOwner } from '@/store/slices/car-catalog/car-catalog.type';
import { resetSelection, selectBrand, selectModel, selectOwner } from '@/store/slices/car-catalog/car-catalog.slice';
import type { AppDispatch } from '@/store';
import type { IAddCarFormState } from '@/store/slices/cars/cars.type';

export const fetchBrandsAction = createAsyncThunk<
  ICarBrand[],
  void,
  {
    rejectValue: string;
  }
>('carCatalog/fetchBrands', async (_, { rejectWithValue }) => {
  try {
    return await carCatalogServices.getBrands();
  } catch {
    return rejectWithValue('Помилка отримання списку марок автомобілів');
  }
});

export const fetchModelsByBrandAction = createAsyncThunk<
  ICarModel[],
  string,
  {
    rejectValue: string;
  }
>('carCatalog/fetchModelsByBrand', async (brandId, { rejectWithValue }) => {
  try {
    return await carCatalogServices.getModelsByBrand(brandId);
  } catch {
    return rejectWithValue('Помилка отримання списку моделей автомобілів');
  }
});

export const fetchOwnersAction = createAsyncThunk<
  IOwner[],
  void,
  {
    rejectValue: string;
  }
>('carCatalog/fetchOwners', async (_, { rejectWithValue }) => {
  try {
    return await carCatalogServices.getOwners();
  } catch {
    return rejectWithValue('Помилка отримання списку власників');
  }
});

export const onBrandSelected =
  (brandId: string | null) => (dispatch: AppDispatch) => {
    dispatch(selectBrand(brandId));

    if (brandId) {
      dispatch(fetchModelsByBrandAction(brandId));
    }
  };

export const resetCarCatalogSelection = () => (dispatch: AppDispatch) => {
  dispatch(resetSelection());
};

export const restoreCarCatalogFromFormState =
  (formState: Pick<IAddCarFormState, 'brandId' | 'modelId' | 'ownerId'>) =>
  (dispatch: AppDispatch) => {
    dispatch(selectBrand(formState.brandId));
    dispatch(selectModel(formState.modelId));
    dispatch(selectOwner(formState.ownerId));

    if (formState.brandId) {
      dispatch(fetchModelsByBrandAction(formState.brandId));
    }
  };
