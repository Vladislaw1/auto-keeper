import { useSelector } from 'react-redux';
import { getCarsSelector } from '@/store/slices/cars/cars.selectors';
import { DataTable } from '@/components/shared';
import { ICar } from '@/store/slices/cars/cars.type';
import { useAppDispatch } from '@/store/hooks';
import { openCarDrawer } from '@/store/slices/cars/cars.slice';
import { AddServiceVisitButton } from '@/views/cars/components/buttons';
import { CarCard } from '@/views/cars/components/entities/CarCard';
import cn from 'classnames';

const EmptyValue = () => <span className={cn('text-warning')}>невказано</span>;

export const CarsList = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector(getCarsSelector);

  if (!data) return null;

  const handleOpenCar = (car: ICar) => {
    dispatch(openCarDrawer(car));
  };

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {data.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onOpen={handleOpenCar}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable<ICar>
          data={data}
          onRowClick={handleOpenCar}
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
            {
              id: 'actions',
              header: '',
              cell: ({ row }) => (
                <AddServiceVisitButton
                  car={row.original}
                  stopPropagation
                />
              ),
            },
          ]}
          compact
        />
      </div>
    </>
  );
};
