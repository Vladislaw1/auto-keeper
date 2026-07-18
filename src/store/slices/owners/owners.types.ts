import { ICar } from '@/store/slices/cars/cars.type';

export type TOwner = {
  id: string;
  last_name: string;
  first_name: string;
};

export type TOwnerCar = Pick<
  ICar,
  'id' | 'brand' | 'model' | 'year' | 'color' | 'carNumber' | 'vin'
>;

export type TOwnerByCar = TOwner & { cars: TOwnerCar[] };

export type TOwnerList = TOwnerByCar[];

export interface ICreateOwnerRequest {
  first_name: string;
  last_name: string;
}

export interface IAddOwnerFormState {
  first_name: string;
  last_name: string;
}

export const ADD_OWNER_FORM_INITIAL: IAddOwnerFormState = {
  first_name: '',
  last_name: '',
};
