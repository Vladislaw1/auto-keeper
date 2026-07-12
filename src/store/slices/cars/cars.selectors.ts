import { RootState } from '@/store';

export const getCarsSelector = (state: RootState) => state.cars.cars;
export const getCarsAction = (state: RootState) => state.cars.action;
export const getAddCarFormStateSelector = (state: RootState) => state.cars.action.formState;
export const getCarDrawerSelector = (state: RootState) => state.cars.drawer;
