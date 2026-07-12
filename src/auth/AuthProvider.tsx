import { useRef, useImperativeHandle, useState } from 'react';
import AuthContext from './AuthContext';
import appConfig from '@/configs/app.config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSessionSignedIn, setUser } from '@/store/slices/authSlice';
import { useToken } from '@/store/token';
import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService';
import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import { useNavigate } from 'react-router';
import type {
  SignInCredential,
  SignUpCredential,
  AuthResult,
  OauthSignInCallbackPayload,
  User,
  Token,
} from '@/@types/auth';
import type { ReactNode, Ref } from 'react';
import type { NavigateFunction } from 'react-router';

type AuthProviderProps = {
  children: ReactNode;
};

export type IsolatedNavigatorRef = {
  navigate: NavigateFunction;
};

const IsolatedNavigator = ({ ref }: { ref: Ref<IsolatedNavigatorRef> }) => {
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    return {
      navigate,
    };
  }, [navigate]);

  return <></>;
};

function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const user = useAppSelector((state) => state.auth.user);
  const { token, setToken } = useToken();
  const [tokenState, setTokenState] = useState(token);

  const authenticated = Boolean(tokenState && signedIn);

  const navigatorRef = useRef<IsolatedNavigatorRef>(null);

  const redirect = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const redirectUrl = params.get(REDIRECT_URL_KEY);

    navigatorRef.current?.navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
  };

  const handleSignIn = (tokens: Token, user?: User) => {
    setToken(tokens.accessToken);
    setTokenState(tokens.accessToken);
    dispatch(setSessionSignedIn(true));

    if (user) {
      dispatch(setUser(user));
    }
  };

  const handleSignOut = () => {
    setToken('');
    dispatch(setUser({}));
    dispatch(setSessionSignedIn(false));
  };

  const signIn = async (values: SignInCredential): AuthResult => {
    try {
      const resp = await apiSignIn(values);
      if (resp) {
        handleSignIn(
          {
            accessToken: resp.token,
          },
          resp.user,
        );
        redirect();
        return {
          status: 'success',
          message: '',
        };
      }
      return {
        status: 'failed',
        message: 'Unable to sign in',
      };
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const signUp = async (values: SignUpCredential): AuthResult => {
    try {
      const resp = await apiSignUp(values);
      if (resp) {
        handleSignIn(
          {
            accessToken: resp.token,
          },
          resp.user,
        );
        redirect();
        return {
          status: 'success',
          message: '',
        };
      }
      return {
        status: 'failed',
        message: 'Unable to sign up',
      };
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const signOut = async () => {
    try {
      await apiSignOut();
    } finally {
      handleSignOut();
      navigatorRef.current?.navigate('/');
    }
  };
  const oAuthSignIn = (callback: (payload: OauthSignInCallbackPayload) => void) => {
    callback({
      onSignIn: handleSignIn,
      redirect,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        signIn,
        signUp,
        signOut,
        oAuthSignIn,
      }}
    >
      {children}
      <IsolatedNavigator ref={navigatorRef} />
    </AuthContext.Provider>
  );
}

export default AuthProvider;
