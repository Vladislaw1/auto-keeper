import { createAsyncThunk } from '@reduxjs/toolkit';
import { carsServices } from '@/services/cars';
import { serviceVisitsServices } from '@/services/service-visits';
import {
  ICar,
  ICreateCarRequest,
  ICreateServiceVisitRequest,
  IServiceVisit,
} from '@/store/slices/cars/cars.type';

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

export const postServiceVisitAction = createAsyncThunk<
  { visit: IServiceVisit; carId: string },
  ICreateServiceVisitRequest,
  { rejectValue: string }
>('cars/postServiceVisit', async (body, { rejectWithValue }) => {
  try {
    const visit = await serviceVisitsServices.create(body);
    return { visit, carId: body.carId };
  } catch (e) {
    return rejectWithValue(e);
  }
});
