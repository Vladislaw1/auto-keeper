import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchBrandsAction,
  fetchModelsByBrandAction,
  fetchOwnersAction,
} from '@/store/slices/car-catalog/car-catalog.actions';
import { ICarBrand, ICarModel, IOwner } from '@/store/slices/car-catalog/car-catalog.type';

interface ICarCatalogState {
  brands: {
    data: ICarBrand[] | null;
    loading: boolean;
    error: string | null;
  };
  models: {
    data: ICarModel[] | null;
    loading: boolean;
    error: string | null;
  };
  owners: {
    data: IOwner[] | null;
    loading: boolean;
    error: string | null;
  };
  selection: {
    brandId: string | null;
    modelId: string | null;
    ownerId: string | null;
  };
}

const initialState: ICarCatalogState = {
  brands: {
    data: null,
    loading: false,
    error: null,
  },
  models: {
    data: null,
    loading: false,
    error: null,
  },
  owners: {
    data: null,
    loading: false,
    error: null,
  },
  selection: {
    brandId: null,
    modelId: null,
    ownerId: null,
  },
};

export const carCatalogSlice = createSlice({
  name: 'carCatalog',
  initialState,
  reducers: {
    selectBrand: (state, action: PayloadAction<string | null>) => {
      state.selection.brandId = action.payload;
      state.selection.modelId = null;
      state.models.data = null;
      state.models.error = null;
      state.models.loading = Boolean(action.payload);
    },
    selectModel: (state, action: PayloadAction<string | null>) => {
      state.selection.modelId = action.payload;
    },
    selectOwner: (state, action: PayloadAction<string | null>) => {
      state.selection.ownerId = action.payload;
    },
    resetSelection: (state) => {
      state.selection.brandId = null;
      state.selection.modelId = null;
      state.selection.ownerId = null;
      state.models.data = null;
      state.models.error = null;
      state.models.loading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBrandsAction.pending, (state) => {
        state.brands.loading = true;
        state.brands.error = null;
      })
      .addCase(fetchBrandsAction.fulfilled, (state, action) => {
        state.brands.data = action.payload;
        state.brands.loading = false;
      })
      .addCase(fetchBrandsAction.rejected, (state, action) => {
        state.brands.error = action.payload ?? 'Помилка отримання списку марок автомобілів';
        state.brands.loading = false;
      })
      .addCase(fetchModelsByBrandAction.pending, (state) => {
        state.models.loading = true;
        state.models.error = null;
      })
      .addCase(fetchModelsByBrandAction.fulfilled, (state, action) => {
        if (state.selection.brandId !== action.meta.arg) {
          return;
        }

        state.models.data = action.payload;
        state.models.loading = false;
      })
      .addCase(fetchModelsByBrandAction.rejected, (state, action) => {
        if (state.selection.brandId !== action.meta.arg) {
          return;
        }

        state.models.error = action.payload ?? 'Помилка отримання списку моделей автомобілів';
        state.models.loading = false;
      })
      .addCase(fetchOwnersAction.pending, (state) => {
        state.owners.loading = true;
        state.owners.error = null;
      })
      .addCase(fetchOwnersAction.fulfilled, (state, action) => {
        state.owners.data = action.payload;
        state.owners.loading = false;
      })
      .addCase(fetchOwnersAction.rejected, (state, action) => {
        state.owners.error = action.payload ?? 'Помилка отримання списку власників';
        state.owners.loading = false;
      }),
});

export const { selectBrand, selectModel, selectOwner, resetSelection } = carCatalogSlice.actions;

export default carCatalogSlice.reducer;
