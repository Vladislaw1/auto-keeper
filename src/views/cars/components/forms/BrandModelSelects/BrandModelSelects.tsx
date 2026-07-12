import { FormItem, Select } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { onBrandSelected } from '@/store/slices/car-catalog/car-catalog.actions';
import { selectModel } from '@/store/slices/car-catalog/car-catalog.slice';
import {
  getBrandOptionsSelector,
  getCarCatalogBrandsSelector,
  getCarCatalogModelsSelector,
  getCarCatalogSelectionSelector,
  getModelOptionsSelector,
} from '@/store/slices/car-catalog/car-catalog.selectors';
import { CarCatalogSelectOption } from '@/store/slices/car-catalog/car-catalog.type';

export const BrandModelSelects = () => {
  const dispatch = useAppDispatch();

  const { loading: brandsLoading } = useAppSelector(getCarCatalogBrandsSelector);
  const { loading: modelsLoading } = useAppSelector(getCarCatalogModelsSelector);
  const { brandId, modelId } = useAppSelector(getCarCatalogSelectionSelector);
  const brandOptions = useAppSelector(getBrandOptionsSelector);
  const modelOptions = useAppSelector(getModelOptionsSelector);

  return (
    <>
      <FormItem
        label="Марка автомобіля"
        className="mb-0"
      >
        <Select<CarCatalogSelectOption>
          isClearable
          usePortal
          isLoading={brandsLoading}
          options={brandOptions}
          value={brandOptions.filter((option) => option.value === brandId)}
          size="sm"
          placeholder="Оберіть марку"
          onChange={(option) => dispatch(onBrandSelected(option?.value ?? null))}
        />
      </FormItem>
      <FormItem
        label="Модель автомобіля"
        className="mb-0"
      >
        <Select<CarCatalogSelectOption>
          isClearable
          usePortal
          isDisabled={!brandId}
          isLoading={modelsLoading}
          options={modelOptions}
          value={modelOptions.filter((option) => option.value === modelId)}
          size="sm"
          placeholder="Оберіть модель"
          onChange={(option) => dispatch(selectModel(option?.value ?? null))}
        />
      </FormItem>
    </>
  );
};
