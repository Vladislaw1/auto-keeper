import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateOwnerRequest, TOwner, TOwnerList } from './owners.types';
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

export const postCreatedOwnerAction = createAsyncThunk<
  TOwner,
  ICreateOwnerRequest,
  { rejectValue: string }
>('owners/postCreatedOwner', async (body, { rejectWithValue }) => {
  try {
    return await ownersServices.create(body);
  } catch (e) {
    return rejectWithValue(e);
  }
});
