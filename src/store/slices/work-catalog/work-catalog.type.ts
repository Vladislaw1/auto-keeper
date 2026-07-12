import type { WorkCategory } from '@/constants/work-category.constant';

export interface IWorkTypeOption {
  id: string;
  name: string;
  category: WorkCategory;
}
