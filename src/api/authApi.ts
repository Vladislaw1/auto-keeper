import axios from 'axios';
import { Tokens } from './types';

// Окремий інстанс без інтерцепторів - щоб уникнути циклічних викликів
// (наприклад, коли refresh сам поверне 401, він не має тригерити ще один refresh)
const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<Tokens> {
    const { data } = await authAxios.post<Tokens>('/auth/login', payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<Tokens> {
    const { data } = await authAxios.post<Tokens>('/auth/register', payload);
    return data;
  },

  async refresh(refreshToken: string): Promise<Tokens> {
    const { data } = await authAxios.post<Tokens>('/auth/refresh', { refreshToken });
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    await authAxios.post('/auth/logout', { refreshToken });
  },
};
