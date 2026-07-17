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
