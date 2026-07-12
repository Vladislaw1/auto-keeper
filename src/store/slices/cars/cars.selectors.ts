import { RootState } from '@/store';

export const getCarsSelector = (state: RootState) => state.cars.cars;
export const getCarsAction = (state: RootState) => state.cars.action;
export const getAddCarFormStateSelector = (state: RootState) => state.cars.action.formState;
export const getServiceVisitActionSelector = (state: RootState) => state.cars.serviceVisitAction;
export const getAddServiceVisitFormStateSelector = (state: RootState) =>
  state.cars.serviceVisitAction.formState;
export const getCarDrawerSelector = (state: RootState) => state.cars.drawer;
