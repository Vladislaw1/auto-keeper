import {
  HiOutlineCheckCircle,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineTruck,
  HiOutlineUser,
} from 'react-icons/hi';
import type { ReactNode } from 'react';

export const ADD_CAR_STEPS = {
  VEHICLE: 0,
  OWNER: 1,
  REGISTRATION: 2,
  TECHNICAL: 3,
  REVIEW: 4,
} as const;

export type AddCarStep = (typeof ADD_CAR_STEPS)[keyof typeof ADD_CAR_STEPS];

export const ADD_CAR_STEPS_COUNT = Object.keys(ADD_CAR_STEPS).length;

export type AddCarStepConfig = {
  key: AddCarStep;
  title: string;
  description: string;
  icon: ReactNode;
};

export const ADD_CAR_STEP_CONFIG: AddCarStepConfig[] = [
  {
    key: ADD_CAR_STEPS.VEHICLE,
    title: 'Автомобіль',
    description: 'Оберіть марку, модель та рік випуску',
    icon: <HiOutlineTruck />,
  },
  {
    key: ADD_CAR_STEPS.OWNER,
    title: 'Власник',
    description: 'Призначте власника автомобіля',
    icon: <HiOutlineUser />,
  },
  {
    key: ADD_CAR_STEPS.REGISTRATION,
    title: 'Реєстраційні дані',
    description: 'Номерний знак, VIN-код та колір кузова',
    icon: <HiOutlineDocumentText />,
  },
  {
    key: ADD_CAR_STEPS.TECHNICAL,
    title: 'Технічні характеристики',
    description: 'Двигун, пробіг та тип трансмісії',
    icon: <HiOutlineCog />,
  },
  {
    key: ADD_CAR_STEPS.REVIEW,
    title: 'Підтвердження',
    description: 'Перевірте дані та збережіть автомобіль',
    icon: <HiOutlineCheckCircle />,
  },
];
