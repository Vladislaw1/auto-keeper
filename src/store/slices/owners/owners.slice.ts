import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ADD_OWNER_FORM_INITIAL,
  IAddOwnerFormState,
  TOwnerList,
} from '@/store/slices/owners/owners.types';
import {
  getAllOwnersAction,
  postCreatedOwnerAction,
} from '@/store/slices/owners/owners.actions';

interface IOwnerState {
  owners: {
    loading: boolean;
    error: string | null;
    data: null | TOwnerList;
  };
  action: {
    isOpened: boolean;
    formState: IAddOwnerFormState | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: IOwnerState = {
  owners: {
    data: null,
    loading: false,
    error: null,
  },
  action: {
    isOpened: false,
    formState: null,
    loading: false,
    error: null,
  },
};

const ownersSlice = createSlice({
  name: 'owners',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.action.isOpened = true;
      state.action.formState = { ...ADD_OWNER_FORM_INITIAL };
      state.action.error = null;
    },
    closeDialog: (state) => {
      state.action.isOpened = false;
      state.action.formState = null;
      state.action.error = null;
    },
    updateFormState: (state, action: PayloadAction<Partial<IAddOwnerFormState>>) => {
      if (state.action.formState) {
        state.action.formState = {
          ...state.action.formState,
          ...action.payload,
        };
      }
    },
  },
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
      })
      .addCase(postCreatedOwnerAction.pending, (state) => {
        state.action.loading = true;
        state.action.error = null;
      })
      .addCase(postCreatedOwnerAction.fulfilled, (state, action) => {
        state.action.loading = false;
        state.action.error = null;
        state.action.isOpened = false;
        state.action.formState = null;

        const ownerWithCars = { ...action.payload, cars: [] };

        if (Array.isArray(state.owners.data)) {
          state.owners.data.push(ownerWithCars);
        } else {
          state.owners.data = [ownerWithCars];
        }
      })
      .addCase(postCreatedOwnerAction.rejected, (state, action) => {
        state.action.error = action.payload ?? 'Помилка додавання власника';
        state.action.loading = false;
      }),
});

export const { openDialog, closeDialog, updateFormState } = ownersSlice.actions;
export default ownersSlice.reducer;
