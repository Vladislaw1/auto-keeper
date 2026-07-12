import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { CarCatalogSelectOption } from '@/store/slices/car-catalog/car-catalog.type';

export const getCarCatalogBrandsSelector = (state: RootState) => state.carCatalog.brands;
export const getCarCatalogModelsSelector = (state: RootState) => state.carCatalog.models;
export const getCarCatalogOwnersSelector = (state: RootState) => state.carCatalog.owners;
export const getCarCatalogSelectionSelector = (state: RootState) => state.carCatalog.selection;

export const getBrandOptionsSelector = createSelector(
  [getCarCatalogBrandsSelector],
  (brands): CarCatalogSelectOption[] =>
    brands.data?.map((brand) => ({
      label: brand.name,
      value: brand.id,
    })) ?? [],
);

export const getModelOptionsSelector = createSelector(
  [getCarCatalogModelsSelector],
  (models): CarCatalogSelectOption[] =>
    models.data?.map((model) => ({
      label: model.name,
      value: model.id,
    })) ?? [],
);

export const getOwnerOptionsSelector = createSelector(
  [getCarCatalogOwnersSelector],
  (owners): CarCatalogSelectOption[] =>
    owners.data?.map((owner) => ({
      label: `${owner.first_name} ${owner.last_name}`,
      value: owner.id,
    })) ?? [],
);

export const getSelectedBrandNameSelector = createSelector(
  [getCarCatalogBrandsSelector, getCarCatalogSelectionSelector],
  (brands, selection) =>
    brands.data?.find((brand) => brand.id === selection.brandId)?.name ?? '',
);

export const getSelectedModelNameSelector = createSelector(
  [getCarCatalogModelsSelector, getCarCatalogSelectionSelector],
  (models, selection) =>
    models.data?.find((model) => model.id === selection.modelId)?.name ?? '',
);
