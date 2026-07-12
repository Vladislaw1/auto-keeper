import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCarsListAction, postCreatedCarAction } from '@/store/slices/cars/cars.actions';
import { ADD_CAR_FORM_INITIAL, IAddCarFormState, ICar } from '@/store/slices/cars/cars.type';

interface ICarsState {
  cars: {
    data: ICar[] | null;
    loading: boolean;
    error: string | null;
  };
  action: {
    isOpened: boolean;
    formState: IAddCarFormState | null;
    loading: boolean;
    error: string | null;
  };
  drawer: {
    isOpened: boolean;
    selectedCar: ICar | null;
  };
}

const initialState: ICarsState = {
  cars: {
    data: null,
    loading: false,
    error: null,
  },
  action: {
    isOpened: false,
    formState: null,
    error: null,
    loading: false,
  },
  drawer: {
    isOpened: false,
    selectedCar: null,
  },
};

export const CarsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.action.isOpened = true;
      state.action.formState = { ...ADD_CAR_FORM_INITIAL };
      state.action.error = null;
    },
    closeDialog: (state) => {
      state.action.isOpened = false;
      state.action.formState = null;
      state.action.error = null;
    },
    updateFormState: (state, action: PayloadAction<Partial<IAddCarFormState>>) => {
      if (state.action.formState) {
        state.action.formState = {
          ...state.action.formState,
          ...action.payload,
        };
      }
    },
    setFormStep: (state, action: PayloadAction<number>) => {
      if (state.action.formState) {
        state.action.formState.step = action.payload;
      }
    },
    openCarDrawer: (state, action: PayloadAction<ICar>) => {
      state.drawer.isOpened = true;
      state.drawer.selectedCar = action.payload;
    },
    closeCarDrawer: (state) => {
      state.drawer.isOpened = false;
      state.drawer.selectedCar = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCarsListAction.pending, (state) => {
        state.cars.loading = true;
        state.cars.data = null;
        state.cars.error = null;
      })
      .addCase(getCarsListAction.fulfilled, (state, action) => {
        state.cars.data = action.payload;
        state.cars.error = null;
        state.cars.loading = false;
      })
      .addCase(getCarsListAction.rejected, (state, action) => {
        state.cars.error = action.payload ?? 'Помилка отримання списку автомобілів';
        state.cars.loading = false;
      })
      .addCase(postCreatedCarAction.pending, (state) => {
        state.action.loading = true;
        state.action.error = null;
      })
      .addCase(postCreatedCarAction.fulfilled, (state, action) => {
        state.action.error = null;
        state.action.loading = false;
        state.action.isOpened = false;
        state.action.formState = null;

        if (Array.isArray(state.cars.data)) {
          state.cars.data.push(action.payload);
        } else {
          state.cars.data = [action.payload];
        }
      })
      .addCase(postCreatedCarAction.rejected, (state, action) => {
        state.action.error = action.payload ?? 'Помилка додавання автомобіля';
        state.action.loading = false;
      }),
});

export const { openDialog, closeDialog, updateFormState, setFormStep, openCarDrawer, closeCarDrawer } =
  CarsSlice.actions;

export default CarsSlice.reducer;
