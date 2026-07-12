import cookiesStorage from '@/utils/cookiesStorage';
import appConfig from '@/configs/app.config';
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant';

const getPersistStorage = () => {
  if (appConfig.accessTokenPersistStrategy === 'localStorage') {
    return localStorage;
  }

  if (appConfig.accessTokenPersistStrategy === 'sessionStorage') {
    return sessionStorage;
  }

  return cookiesStorage;
};

export const useToken = () => {
  const storage = getPersistStorage();

  const setToken = (token: string) => {
    storage.setItem(TOKEN_NAME_IN_STORAGE, token);
  };

  return {
    setToken,
    token: storage.getItem(TOKEN_NAME_IN_STORAGE),
  };
};
