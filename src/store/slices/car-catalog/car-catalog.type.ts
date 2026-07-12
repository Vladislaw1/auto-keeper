export interface ICarBrand {
  id: string;
  name: string;
}

export interface ICarModel {
  id: string;
  name: string;
}

export interface IOwner {
  id: string;
  first_name: string;
  last_name: string;
}

export type CarCatalogSelectOption = {
  label: string;
  value: string;
};
