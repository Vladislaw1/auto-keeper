import { createAsyncThunk } from '@reduxjs/toolkit';
import { carsServices } from '@/services/cars';
import { ICar, ICreateCarRequest } from '@/store/slices/cars/cars.type';

export const getCarsListAction = createAsyncThunk<
  ICar[],
  void,
  {
    rejectValue: string;
  }
>('cars/getCarsList', async (_, { rejectWithValue }) => {
  try {
    return await carsServices.getAll();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const postCreatedCarAction = createAsyncThunk<
  ICar,
  ICreateCarRequest,
  { rejectValue: string }
>('cars/postCreatedCar', async (body, { rejectWithValue }) => {
  try {
    return await carsServices.create(body);
  } catch (e) {
    return rejectWithValue(e);
  }
});
