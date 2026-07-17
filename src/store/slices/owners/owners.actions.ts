import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOwnerList } from './owners.types';
import { ownersServices } from '@/services/owners';

export const getAllOwnersAction = createAsyncThunk<TOwnerList, void, { rejectValue: string }>(
  'owners/getOwners',
  async (_, { rejectWithValue }) => {
    try {
      return await ownersServices.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
