import { useAppSelector } from '@/store/hooks';
import { getOwnersSelector } from '@/store/slices/owners/owners.selectors';
import { DataTable } from '@/components/shared';
import { TOwnerByCar, TOwnerCar } from '@/store/slices/owners/owners.types';
import { Button } from '@/components/ui';
import cn from 'classnames';
import { BiTrash } from 'react-icons/bi';

const OwnerCarsExpanded = ({ cars }: { cars: TOwnerCar[] }) => {
  if (!cars.length) {
    return <p className="py-2 text-sm text-gray-500">Автомобілів немає</p>;
  }

  return (
    <div className={cn('flex flex-col gap-2 py-1')}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Автомобілі</p>
      <div className={cn('grid gap-2 sm:grid-cols-2 lg:grid-cols-3')}>
        {cars.map((car) => (
          <div
            key={car.id}
            className={cn(
              'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900/40',
            )}
          >
            <p className="font-medium">
              {car.brand} {car.model}
            </p>
            <p className="text-xs text-gray-500">
              {car.year ? `${car.year} · ` : ''}
              {car.carNumber ? `${car.carNumber} · ` : ' без номера '}
              {car.vin ? ` · ${car.vin}` : ' без VIN '}
              {car.color ? ` · ${car.color}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OwnersLists = () => {
  const { data } = useAppSelector(getOwnersSelector);

  if (!data) return null;

  return (
    <DataTable<TOwnerByCar>
      compact
      expandable
      data={data}
      getRowCanExpand={(row) => row.original.cars.length > 0}
      renderExpandedRow={(owner) => <OwnerCarsExpanded cars={owner.cars} />}
      pagingData={{
        total: data.length,
        pageIndex: 1,
        pageSize: Math.max(data.length, 10),
      }}
      columns={[
        {
          accessorKey: 'last_name',
          header: 'Прізвище',
          cell: ({ row }) => row.original.last_name,
        },
        {
          accessorKey: 'first_name',
          header: "Ім'я",
          cell: ({ row }) => row.original.first_name,
        },
        {
          accessorKey: 'cars',
          header: 'Кількість автомобілів',
          cell: ({ row }) => row.original.cars.length,
        },
        {
          id: 'actions',
          header: '',
          cell: ({ row }) => {
            return (
              <div className={cn('flex items-center justify-end gap-2')}>
                <Button
                  variant="plain"
                  size="xs"
                  icon={<BiTrash />}
                  onClick={(event) => event.stopPropagation()}
                >
                  Видалити
                </Button>
              </div>
            );
          },
        },
      ]}
    />
  );
};
