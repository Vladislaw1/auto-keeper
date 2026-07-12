import { api } from '@/api/axiosInstance';
import { ICreateServiceVisitRequest, IServiceVisit } from '@/store/slices/cars/cars.type';

export const serviceVisitsServices = {
  async create(payload: ICreateServiceVisitRequest): Promise<IServiceVisit> {
    const { data } = await api.post<IServiceVisit>('/service-visit', payload);
    return data;
  },

  async getByCarId(carId: string): Promise<IServiceVisit[]> {
    const { data } = await api.get<IServiceVisit[]>('/service-visit', { params: { carId } });
    return data;
  },
};
