import type { FuelType, Transmission } from '@/constants/cars.constant';

export interface ICarOwner {
  id: string;
  first_name: string;
  last_name: string;
}

export interface ICarPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface ICar {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  engineCode: string;
  engineVolume: string;
  vin: string;
  carNumber: string;

  createdAt: Date;
  updatedAt: Date;

  owner: ICarOwner;
  photos: ICarPhoto[];

  servicesVisits: any;
}

export type ICreateCarPayload = Omit<ICar, 'id'>;

export type ICreateCarRequest = {
  brand: string;
  model: string;
  ownerId: string;
  year: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  engineCode: string;
  engineVolume: string;
  vin: string;
  carNumber: string;
};

export interface IAddCarFormState {
  step: number;
  brandId: string | null;
  modelId: string | null;
  brand: string;
  model: string;
  ownerId: string | null;
  year: number | '';
  carNumber: string;
  vin: string;
  color: string;
  engineCode: string;
  engineVolume: string;
  mileage: number | '';
  fuelType: FuelType | '';
  transmission: Transmission | '';
}

export const ADD_CAR_FORM_INITIAL: IAddCarFormState = {
  step: 0,
  brandId: null,
  modelId: null,
  brand: '',
  model: '',
  ownerId: null,
  year: '',
  carNumber: '',
  vin: '',
  color: '',
  engineCode: '',
  engineVolume: '',
  mileage: '',
  fuelType: '',
  transmission: '',
};

export type IUpdateCarPayload = Partial<ICreateCarPayload>;
