import { api } from '@/api/axiosInstance';
import { ICarBrand, ICarModel, IOwner } from '@/store/slices/car-catalog/car-catalog.type';

export const carCatalogServices = {
  async getBrands(): Promise<ICarBrand[]> {
    const { data } = await api.get<ICarBrand[]>('/brands');
    return data;
  },

  async getModelsByBrand(brandId: string): Promise<ICarModel[]> {
    const { data } = await api.get<ICarModel[]>(`/brands/${brandId}/models`);
    return data;
  },

  async getOwners(): Promise<IOwner[]> {
    const { data } = await api.get<IOwner[]>('/owners');
    return data;
  },
};
