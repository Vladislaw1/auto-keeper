import { ICar, ICreateCarRequest, IUpdateCarPayload } from '@/store/slices/cars/cars.type';
import { TOwnerList } from '@/store/slices/owners/owners.types';
import { api } from '@/api/axiosInstance';

export const ownersServices = {
  async getAll(): Promise<TOwnerList> {
    const { data } = await api.get<TOwnerList>('/owners');
    return data;
  },

  async getById(id: string): Promise<ICar> {
    const { data } = await api.get<ICar>(`/cars/${id}`);
    return data;
  },

  async create(payload: ICreateCarRequest): Promise<ICar> {
    const { data } = await api.post<ICar>('/cars/create', payload);
    return data;
  },

  async update(id: string, payload: IUpdateCarPayload): Promise<ICar> {
    const { data } = await api.put<ICar>(`/cars/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<ICar> {
    const { data } = await api.delete<ICar>(`/cars/remove/${id}`);
    return data;
  },
};
