import axios from 'axios';

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

export const queryOverpass = async <T>(query: string, signal?: AbortSignal): Promise<T> => {
  let lastError: unknown;

  for (const url of ENDPOINTS) {
    try {
      const { data } = await axios.post<T>(url, new URLSearchParams({ data: query }), {
        timeout: 10000,
        signal,
      });
      return data;
    } catch (e) {
      if (axios.isCancel(e)) throw e;
      lastError = e;
    }
  }

  throw lastError;
};
