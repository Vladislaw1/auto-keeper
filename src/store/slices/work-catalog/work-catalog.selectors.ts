import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import {
  WORK_CATEGORY_LABELS,
  WORK_CATEGORY_ORDER,
  WorkCategory,
} from '@/constants/work-category.constant';
import { IWorkTypeOption } from '@/store/slices/work-catalog/work-catalog.type';

export const getWorkTypesSelector = (state: RootState) => state.workCatalog.workTypes;

export type WorkTypeGroupOption = {
  label: string;
  options: { label: string; value: string; category: WorkCategory }[];
};

export const getGroupedWorkTypeOptionsSelector = createSelector(
  [(state: RootState) => state.workCatalog.workTypes.data],
  (workTypes): WorkTypeGroupOption[] => {
    if (!workTypes?.length) {
      return [];
    }

    const grouped = new Map<WorkCategory, IWorkTypeOption[]>();

    workTypes.forEach((workType) => {
      const items = grouped.get(workType.category) ?? [];
      items.push(workType);
      grouped.set(workType.category, items);
    });

    return WORK_CATEGORY_ORDER.filter((category) => grouped.has(category)).map((category) => ({
      label: WORK_CATEGORY_LABELS[category],
      options: (grouped.get(category) ?? []).map((workType) => ({
        label: workType.name,
        value: workType.id,
        category: workType.category,
      })),
    }));
  },
);
