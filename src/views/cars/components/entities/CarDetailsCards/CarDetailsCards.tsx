import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS, FuelType, Transmission } from '@/constants/cars.constant';
import { ICar } from '@/store/slices/cars/cars.type';
import type { ReactNode } from 'react';

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
};

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-3 border-b border-gray-200/80 py-1.5 last:border-0 dark:border-gray-700/80">
    <span className="shrink-0 text-sm text-gray-500">{label}</span>
    <span className="text-right text-sm font-medium text-gray-900 break-all dark:text-gray-100">
      {value || '—'}
    </span>
  </div>
);

const ReviewCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-xl border border-gray-200 bg-white/80 p-3.5 dark:border-gray-700 dark:bg-gray-900/40">
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{title}</p>
    <div>{children}</div>
  </div>
);

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
});

type CarDetailsCardsProps = {
  data: CarDetailsData;
};

export const CarDetailsCards = ({ data }: CarDetailsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
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
