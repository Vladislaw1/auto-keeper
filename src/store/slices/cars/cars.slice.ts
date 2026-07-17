import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteCarAction,
  getCarsListAction,
  postCreatedCarAction,
  postServiceVisitAction,
} from '@/store/slices/cars/cars.actions';
import {
  ADD_CAR_FORM_INITIAL,
  ADD_SERVICE_VISIT_FORM_INITIAL,
  IAddCarFormState,
  IAddServiceVisitFormItem,
  IAddServiceVisitFormState,
  ICar,
} from '@/store/slices/cars/cars.type';

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
  serviceVisitAction: {
    isOpened: boolean;
    selectedCar: ICar | null;
    formState: IAddServiceVisitFormState | null;
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
  serviceVisitAction: {
    isOpened: false,
    selectedCar: null,
    formState: null,
    error: null,
    loading: false,
  },
  drawer: {
    isOpened: false,
    selectedCar: null,
  },
};

const appendVisitToCar = (car: ICar, visit: ICar['serviceVisits'][number]) => {
  car.serviceVisits = [visit, ...(car.serviceVisits ?? [])];
};

const deleteCar = (id: string, cars: ICar[]) => cars?.filter((car) => car?.id !== id);

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
    openAddVisitDialog: (state, action: PayloadAction<ICar>) => {
      state.serviceVisitAction.isOpened = true;
      state.serviceVisitAction.selectedCar = action.payload;
      state.serviceVisitAction.formState = ADD_SERVICE_VISIT_FORM_INITIAL(
        action.payload.id,
        action.payload.mileage,
      );
      state.serviceVisitAction.error = null;
    },
    closeAddVisitDialog: (state) => {
      state.serviceVisitAction.isOpened = false;
      state.serviceVisitAction.selectedCar = null;
      state.serviceVisitAction.formState = null;
      state.serviceVisitAction.error = null;
    },
    updateServiceVisitFormState: (
      state,
      action: PayloadAction<Partial<IAddServiceVisitFormState>>,
    ) => {
      if (state.serviceVisitAction.formState) {
        state.serviceVisitAction.formState = {
          ...state.serviceVisitAction.formState,
          ...action.payload,
        };
      }
    },
    addServiceVisitItem: (state) => {
      if (state.serviceVisitAction.formState) {
        state.serviceVisitAction.formState.items.push({
          workTypeId: '',
          price: '',
          note: '',
        });
      }
    },
    removeServiceVisitItem: (state, action: PayloadAction<number>) => {
      if (!state.serviceVisitAction.formState) {
        return;
      }

      if (state.serviceVisitAction.formState.items.length <= 1) {
        return;
      }

      state.serviceVisitAction.formState.items.splice(action.payload, 1);
    },
    updateServiceVisitItem: (
      state,
      action: PayloadAction<{ index: number } & Partial<IAddServiceVisitFormItem>>,
    ) => {
      const { index, ...changes } = action.payload;
      const item = state.serviceVisitAction.formState?.items[index];

      if (!item) {
        return;
      }

      state.serviceVisitAction.formState!.items[index] = {
        ...item,
        ...changes,
      };
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
      })
      .addCase(postServiceVisitAction.pending, (state) => {
        state.serviceVisitAction.loading = true;
        state.serviceVisitAction.error = null;
      })
      .addCase(postServiceVisitAction.fulfilled, (state, action) => {
        const { visit, carId } = action.payload;

        state.serviceVisitAction.loading = false;
        state.serviceVisitAction.error = null;
        state.serviceVisitAction.isOpened = false;
        state.serviceVisitAction.formState = null;
        state.serviceVisitAction.selectedCar = null;

        const carInList = state.cars.data?.find((car) => car.id === carId);
        if (carInList) {
          appendVisitToCar(carInList, visit);
        }

        if (state.drawer.selectedCar?.id === carId) {
          appendVisitToCar(state.drawer.selectedCar, visit);
        }
      })
      .addCase(postServiceVisitAction.rejected, (state, action) => {
        state.serviceVisitAction.error = action.payload ?? 'Помилка додавання візиту на СТО';
        state.serviceVisitAction.loading = false;
      })
      .addCase(deleteCarAction.pending, (state) => {
        state.serviceVisitAction.loading = true;
        state.serviceVisitAction.error = null;
      })
      .addCase(deleteCarAction.fulfilled, (state, action) => {
        const { id } = action.payload;

        state.serviceVisitAction.loading = false;
        state.serviceVisitAction.error = null;

        if (!state.cars.data || state.cars.data?.length === 0) return;

        if (id && state.cars.data) {
          deleteCar(id, state.cars.data);
        }
      })
      .addCase(deleteCarAction.rejected, (state, action) => {
        state.serviceVisitAction.error = action.payload ?? 'Помилка видалення автомобіля';
        state.serviceVisitAction.loading = false;
      }),
});

export const {
  openDialog,
  closeDialog,
  updateFormState,
  setFormStep,
  openAddVisitDialog,
  closeAddVisitDialog,
  updateServiceVisitFormState,
  addServiceVisitItem,
  removeServiceVisitItem,
  updateServiceVisitItem,
  openCarDrawer,
  closeCarDrawer,
} = CarsSlice.actions;

export default CarsSlice.reducer;
