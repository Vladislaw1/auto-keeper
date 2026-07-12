import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkTypesAction } from '@/store/slices/work-catalog/work-catalog.actions';
import { IWorkTypeOption } from '@/store/slices/work-catalog/work-catalog.type';

interface IWorkCatalogState {
  workTypes: {
    data: IWorkTypeOption[] | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: IWorkCatalogState = {
  workTypes: {
    data: null,
    loading: false,
    error: null,
  },
};

export const workCatalogSlice = createSlice({
  name: 'workCatalog',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchWorkTypesAction.pending, (state) => {
        state.workTypes.loading = true;
        state.workTypes.error = null;
      })
      .addCase(fetchWorkTypesAction.fulfilled, (state, action) => {
        state.workTypes.data = action.payload;
        state.workTypes.loading = false;
      })
      .addCase(fetchWorkTypesAction.rejected, (state, action) => {
        state.workTypes.error = action.payload ?? 'Помилка отримання списку типів робіт';
        state.workTypes.loading = false;
      }),
});

export default workCatalogSlice.reducer;
