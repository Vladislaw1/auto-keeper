export const FUEL_TYPE = {
  PETROL: 'PETROL',
  DIESEL: 'DIESEL',
  HYBRID: 'HYBRID',
  ELECTRIC: 'ELECTRIC',
  GAS: 'GAS',
} as const;

export type FuelType = (typeof FUEL_TYPE)[keyof typeof FUEL_TYPE];

export const TRANSMISSION = {
  MANUAL: 'MANUAL',
  AUTOMATIC: 'AUTOMATIC',
} as const;

export type Transmission = (typeof TRANSMISSION)[keyof typeof TRANSMISSION];

export type CarSelectOption<T extends string> = {
  label: string;
  value: T;
};

export const FUEL_TYPE_LABELS: Record<FuelType, string> = {
  [FUEL_TYPE.PETROL]: 'Бензин',
  [FUEL_TYPE.DIESEL]: 'Дизель',
  [FUEL_TYPE.HYBRID]: 'Гібрид',
  [FUEL_TYPE.ELECTRIC]: 'Електро',
  [FUEL_TYPE.GAS]: 'Газ',
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  [TRANSMISSION.MANUAL]: 'Механічна',
  [TRANSMISSION.AUTOMATIC]: 'Автоматична',
};

export const FUEL_TYPE_OPTIONS: CarSelectOption<FuelType>[] = [
  {
    value: FUEL_TYPE.PETROL,
    label: FUEL_TYPE_LABELS.PETROL,
  },
  {
    value: FUEL_TYPE.DIESEL,
    label: FUEL_TYPE_LABELS.DIESEL,
  },
  {
    value: FUEL_TYPE.HYBRID,
    label: FUEL_TYPE_LABELS.HYBRID,
  },
  {
    value: FUEL_TYPE.ELECTRIC,
    label: FUEL_TYPE_LABELS.ELECTRIC,
  },
  {
    value: FUEL_TYPE.GAS,
    label: FUEL_TYPE_LABELS.GAS,
  },
];

export const TRANSMISSION_OPTIONS: CarSelectOption<Transmission>[] = [
  {
    value: TRANSMISSION.MANUAL,
    label: TRANSMISSION_LABELS.MANUAL,
  },
  {
    value: TRANSMISSION.AUTOMATIC,
    label: TRANSMISSION_LABELS.AUTOMATIC,
  },
];
