import { createAsyncThunk } from '@reduxjs/toolkit';
import { workCatalogServices } from '@/services/work-catalog';
import type { WorkCategory } from '@/constants/work-category.constant';
import { IWorkTypeOption } from '@/store/slices/work-catalog/work-catalog.type';

export const fetchWorkTypesAction = createAsyncThunk<
  IWorkTypeOption[],
  WorkCategory | void,
  {
    rejectValue: string;
  }
>('workCatalog/fetchWorkTypes', async (category, { rejectWithValue }) => {
  try {
    return await workCatalogServices.getWorkTypes(category || undefined);
  } catch {
    return rejectWithValue('Помилка отримання списку типів робіт');
  }
});
