import { ICreateOwnerRequest, TOwner, TOwnerList } from '@/store/slices/owners/owners.types';
import { api } from '@/api/axiosInstance';

export const ownersServices = {
  async getAll(): Promise<TOwnerList> {
    const { data } = await api.get<TOwnerList>('/owners');
    return data;
  },

  async create(payload: ICreateOwnerRequest): Promise<TOwner> {
    const { data } = await api.post<TOwner>('/owners/create', payload);
    return data;
  },
};
