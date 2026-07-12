import { FormItem, Select } from '@/components/ui';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectOwner } from '@/store/slices/car-catalog/car-catalog.slice';

import {

  getCarCatalogOwnersSelector,

  getCarCatalogSelectionSelector,

  getOwnerOptionsSelector,

} from '@/store/slices/car-catalog/car-catalog.selectors';

import { CarCatalogSelectOption } from '@/store/slices/car-catalog/car-catalog.type';



export const OwnerSelect = () => {

  const dispatch = useAppDispatch();



  const { loading } = useAppSelector(getCarCatalogOwnersSelector);

  const { ownerId } = useAppSelector(getCarCatalogSelectionSelector);

  const ownerOptions = useAppSelector(getOwnerOptionsSelector);



  return (

    <FormItem

      label="Власник"

      className="mb-0"

    >

      <Select<CarCatalogSelectOption>
        isClearable
        usePortal
        isLoading={loading}

        options={ownerOptions}

        value={ownerOptions.filter((option) => option.value === ownerId)}

        size="sm"

        placeholder="Оберіть власника"

        onChange={(option) => dispatch(selectOwner(option?.value ?? null))}

      />

    </FormItem>

  );

};


