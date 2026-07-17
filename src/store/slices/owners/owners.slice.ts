import { createSlice } from '@reduxjs/toolkit';
import { TOwnerList } from '@/store/slices/owners/owners.types';
import { getAllOwnersAction } from '@/store/slices/owners/owners.actions';

interface IOwnerState {
  owners: {
    loading: boolean;
    error: string | null;
    data: null | TOwnerList;
  };
}

const initialState: IOwnerState = {
  owners: {
    data: null,
    loading: false,
    error: null,
  },
};

const ownersSlice = createSlice({
  name: 'owners',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllOwnersAction.pending, (state) => {
        state.owners.loading = true;
        state.owners.data = null;
        state.owners.error = null;
      })
      .addCase(getAllOwnersAction.fulfilled, (state, action) => {
        state.owners.loading = false;
        state.owners.error = null;
        state.owners.data = action.payload;
      })
      .addCase(getAllOwnersAction.rejected, (state, action) => {
        state.owners.loading = false;
        state.owners.error = action.payload ?? 'Помилка при отриманні списку власників';
      }),
});

export default ownersSlice.reducer;
