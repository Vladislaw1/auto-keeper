import type { ReactNode } from 'react';
import {
  HiOutlineBeaker,
  HiOutlineCog,
  HiOutlineColorSwatch,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineTruck,
} from 'react-icons/hi';
import {
  MdOutlineAcUnit,
  MdOutlineBuild,
  MdOutlineDirectionsCar,
  MdOutlineLocalGasStation,
  MdOutlinePrecisionManufacturing,
  MdOutlineTireRepair,
  MdOutlineWaterDrop,
} from 'react-icons/md';
import { TbSteeringWheel, TbWind } from 'react-icons/tb';

export const WORK_CATEGORY = {
  ENGINE: 'ENGINE',
  TRANSMISSION: 'TRANSMISSION',
  BRAKES: 'BRAKES',
  SUSPENSION: 'SUSPENSION',
  STEERING: 'STEERING',
  ELECTRICAL: 'ELECTRICAL',
  COOLING: 'COOLING',
  FUEL_SYSTEM: 'FUEL_SYSTEM',
  EXHAUST: 'EXHAUST',
  TIRES: 'TIRES',
  BODY: 'BODY',
  INTERIOR: 'INTERIOR',
  AC_CLIMATE: 'AC_CLIMATE',
  DIAGNOSTICS: 'DIAGNOSTICS',
  OTHER: 'OTHER',
} as const;

export type WorkCategory = (typeof WORK_CATEGORY)[keyof typeof WORK_CATEGORY];

export type WorkCategorySelectOption = {
  label: string;
  value: WorkCategory;
};

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  [WORK_CATEGORY.ENGINE]: 'Двигун',
  [WORK_CATEGORY.TRANSMISSION]: 'Трансмісія',
  [WORK_CATEGORY.BRAKES]: 'Гальма',
  [WORK_CATEGORY.SUSPENSION]: 'Підвіска',
  [WORK_CATEGORY.STEERING]: 'Кермо',
  [WORK_CATEGORY.ELECTRICAL]: 'Електрика',
  [WORK_CATEGORY.COOLING]: 'Охолодження',
  [WORK_CATEGORY.FUEL_SYSTEM]: 'Паливна система',
  [WORK_CATEGORY.EXHAUST]: 'Вихлоп',
  [WORK_CATEGORY.TIRES]: 'Шини',
  [WORK_CATEGORY.BODY]: 'Кузов',
  [WORK_CATEGORY.INTERIOR]: 'Салон',
  [WORK_CATEGORY.AC_CLIMATE]: 'Клімат',
  [WORK_CATEGORY.DIAGNOSTICS]: 'Діагностика',
  [WORK_CATEGORY.OTHER]: 'Інше',
};

export const WORK_CATEGORY_ICONS: Record<WorkCategory, ReactNode> = {
  [WORK_CATEGORY.ENGINE]: <HiOutlineCog />,
  [WORK_CATEGORY.TRANSMISSION]: <MdOutlinePrecisionManufacturing />,
  [WORK_CATEGORY.BRAKES]: <MdOutlineBuild />,
  [WORK_CATEGORY.SUSPENSION]: <HiOutlineTruck />,
  [WORK_CATEGORY.STEERING]: <TbSteeringWheel />,
  [WORK_CATEGORY.ELECTRICAL]: <HiOutlineLightningBolt />,
  [WORK_CATEGORY.COOLING]: <MdOutlineWaterDrop />,
  [WORK_CATEGORY.FUEL_SYSTEM]: <MdOutlineLocalGasStation />,
  [WORK_CATEGORY.EXHAUST]: <TbWind />,
  [WORK_CATEGORY.TIRES]: <MdOutlineTireRepair />,
  [WORK_CATEGORY.BODY]: <MdOutlineDirectionsCar />,
  [WORK_CATEGORY.INTERIOR]: <HiOutlineColorSwatch />,
  [WORK_CATEGORY.AC_CLIMATE]: <MdOutlineAcUnit />,
  [WORK_CATEGORY.DIAGNOSTICS]: <HiOutlineBeaker />,
  [WORK_CATEGORY.OTHER]: <HiOutlineSparkles />,
};

export const WORK_CATEGORY_OPTIONS: WorkCategorySelectOption[] = Object.values(WORK_CATEGORY).map(
  (value) => ({
    value,
    label: WORK_CATEGORY_LABELS[value],
  }),
);

export const WORK_CATEGORY_ORDER: WorkCategory[] = Object.values(WORK_CATEGORY);
