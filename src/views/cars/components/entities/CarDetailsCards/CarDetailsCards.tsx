import {
  FUEL_TYPE_LABELS,
  FuelType,
  Transmission,
  TRANSMISSION_LABELS,
} from '@/constants/cars.constant';
import { ICar, ICarPhoto } from '@/store/slices/cars/cars.type';
import cn from 'classnames';
import { DetailServiceVisitsDialog } from '@/views/cars/components';
import { ReviewCard, ReviewRow } from '@/components/custom';

export type CarDetailsData = {
  brand: string;
  model: string;
  year: number | string;
  ownerName: string;
  carNumber: string;
  vin: string;
  color: string;
  engineCode: string;
  engineVolume: string;
  mileage: number | string;
  fuelType: string;
  transmission: string;
  photos: ICarPhoto[];
};

const formatFuelType = (fuelType: string) =>
  fuelType in FUEL_TYPE_LABELS ? FUEL_TYPE_LABELS[fuelType as FuelType] : fuelType;

const formatTransmission = (transmission: string) =>
  transmission in TRANSMISSION_LABELS
    ? TRANSMISSION_LABELS[transmission as Transmission]
    : transmission;

export const mapCarToDetails = (car: ICar): CarDetailsData => ({
  brand: car.brand,
  model: car.model,
  year: car.year,
  ownerName: `${car.owner.first_name} ${car.owner.last_name}`,
  carNumber: car.carNumber,
  vin: car.vin,
  color: car.color,
  engineCode: car.engineCode,
  engineVolume: car.engineVolume,
  mileage: car.mileage,
  fuelType: car.fuelType,
  transmission: car.transmission,
  photos: car.photos ?? [],
});

type CarDetailsCardsProps = {
  data: CarDetailsData;
  showServiceVisits?: boolean;
};

export const CarDetailsCards = ({ data, showServiceVisits = true }: CarDetailsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className={cn('flex flex-wrap items-center justify-center gap-3')}>
        {data?.photos?.length > 0 &&
          data?.photos?.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt="car"
              className={cn('h-auto max-h-48 w-full max-w-xs rounded-lg object-cover sm:h-50 sm:w-50')}
            />
          ))}
      </div>
      {showServiceVisits && <DetailServiceVisitsDialog />}
      <ReviewCard title="Автомобіль">
        <ReviewRow
          label="Марка"
          value={data.brand}
        />
        <ReviewRow
          label="Модель"
          value={data.model}
        />
        <ReviewRow
          label="Рік випуску"
          value={data.year ? String(data.year) : ''}
        />
      </ReviewCard>

      <ReviewCard title="Власник">
        <ReviewRow
          label="ПІБ"
          value={data.ownerName}
        />
      </ReviewCard>

      <ReviewCard title="Реєстрація">
        <ReviewRow
          label="Номерний знак"
          value={data.carNumber}
        />
        <ReviewRow
          label="VIN"
          value={data.vin}
        />
        <ReviewRow
          label="Колір"
          value={data.color}
        />
      </ReviewCard>

      <ReviewCard title="Технічні дані">
        <ReviewRow
          label="Код двигуна"
          value={data.engineCode}
        />
        <ReviewRow
          label="Об'єм двигуна"
          value={data.engineVolume}
        />
        <ReviewRow
          label="Пробіг"
          value={data.mileage !== '' && data.mileage != null ? String(data.mileage) : ''}
        />
        <ReviewRow
          label="Тип палива"
          value={data.fuelType ? formatFuelType(data.fuelType) : ''}
        />
        <ReviewRow
          label="Коробка передач"
          value={data.transmission ? formatTransmission(data.transmission) : ''}
        />
      </ReviewCard>
    </div>
  );
};
