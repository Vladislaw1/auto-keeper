import { Button, FormItem, Input, Select } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getGroupedWorkTypeOptionsSelector,
  WorkTypeGroupOption,
} from '@/store/slices/work-catalog/work-catalog.selectors';
import { removeServiceVisitItem, updateServiceVisitItem } from '@/store/slices/cars/cars.slice';
import { IAddServiceVisitFormItem } from '@/store/slices/cars/cars.type';
import { BsTrash } from 'react-icons/bs';

type ServiceVisitItemProps = {
  index: number;
  item: IAddServiceVisitFormItem;
  canRemove: boolean;
};

type WorkTypeSelectOption = WorkTypeGroupOption['options'][number];

export const ServiceVisitItem = ({ index, item, canRemove }: ServiceVisitItemProps) => {
  const dispatch = useAppDispatch();
  const groupedOptions = useAppSelector(getGroupedWorkTypeOptionsSelector);

  const flatOptions = groupedOptions.flatMap((group) => group.options);
  const selectedOption = flatOptions.find((option) => option.value === item.workTypeId) ?? null;

  const handlePriceChange = (value: string) => {
    const price = value === '' ? '' : Number(value);
    dispatch(updateServiceVisitItem({ index, price }));
  };

  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
      <FormItem
        label="Тип роботи"
        className="mb-0"
      >
        <Select<WorkTypeSelectOption, false, WorkTypeGroupOption>
          usePortal
          size="sm"
          placeholder="Оберіть тип роботи"
          options={groupedOptions}
          value={selectedOption}
          menuPlacement={'top'}
          onChange={(option) =>
            dispatch(updateServiceVisitItem({ index, workTypeId: option?.value ?? '' }))
          }
        />
      </FormItem>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormItem
          label="Вартість"
          className="mb-0"
        >
          <Input
            size="sm"
            type="number"
            min={0}
            placeholder="0"
            value={item.price}
            onChange={(event) => handlePriceChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label="Примітка (марка деталі)"
          className="mb-0"
        >
          <Input
            size="sm"
            value={item.note}
            onChange={(event) =>
              dispatch(updateServiceVisitItem({ index, note: event.target.value }))
            }
          />
        </FormItem>
      </div>
      {canRemove && (
        <div className="flex justify-end">
          <Button
            size="xs"
            variant="plain"
            type="button"
            icon={<BsTrash />}
            onClick={() => dispatch(removeServiceVisitItem(index))}
          >
            Видалити роботу
          </Button>
        </div>
      )}
    </div>
  );
};
