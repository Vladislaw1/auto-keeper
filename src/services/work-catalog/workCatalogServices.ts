import { api } from '@/api/axiosInstance';
import type { WorkCategory } from '@/constants/work-category.constant';
import { IWorkTypeOption } from '@/store/slices/work-catalog/work-catalog.type';

export const workCatalogServices = {
  async getWorkTypes(category?: WorkCategory): Promise<IWorkTypeOption[]> {
    const { data } = await api.get<IWorkTypeOption[]>('/work-types', {
      params: category ? { category } : undefined,
    });
    return data;
  },
};
