import { useSelector } from 'react-redux';
import { getCarsSelector } from '@/store/slices/cars/cars.selectors';
import { DataTable } from '@/components/shared';
import { ICar } from '@/store/slices/cars/cars.type';
import { useAppDispatch } from '@/store/hooks';
import { openCarDrawer } from '@/store/slices/cars/cars.slice';
import cn from 'classnames';

const EmptyValue = () => <span className={cn('text-warning')}>невказано</span>;

export const CarsList = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector(getCarsSelector);

  if (!data) return null;

  return (
    <DataTable<ICar>
      data={data}
      onRowClick={(car) => dispatch(openCarDrawer(car))}
      columns={[
        {
          accessorKey: 'brand',
          header: 'Марка',
          cell: ({ row }) => row.original.brand,
        },
        {
          accessorKey: 'model',
          header: 'Модель',
          cell: ({ row }) => row.original.model,
        },
        {
          accessorKey: 'year',
          header: 'Рік',
          cell: ({ row }) => row.original.year ?? <EmptyValue />,
        },
        {
          accessorKey: 'carNumber',
          header: 'Номерний знак',
          cell: ({ row }) => row.original.carNumber || <EmptyValue />,
        },
        {
          id: 'owner',
          header: 'Власник',
          cell: ({ row }) => {
            const { owner } = row.original;
            return `${owner.first_name} ${owner.last_name}`;
          },
        },
      ]}
      compact
    />
  );
};
