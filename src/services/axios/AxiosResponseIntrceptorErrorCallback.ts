import { store } from '@/store';
import { setSessionSignedIn, setUser } from '@/store/slices/authSlice';
import { useToken } from '@/store/token';
import type { AxiosError } from 'axios';

const unauthorizedCode = [401, 419, 440];

const AxiosResponseIntrceptorErrorCallback = (error: AxiosError) => {
  const { response } = error;
  const { setToken } = useToken();

  if (response && unauthorizedCode.includes(response.status)) {
    setToken('');
    store.dispatch(setUser({}));
    store.dispatch(setSessionSignedIn(false));
  }
};

export default AxiosResponseIntrceptorErrorCallback;
