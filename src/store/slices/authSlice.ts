import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/@types/auth';

type Session = {
  signedIn: boolean;
};

export type AuthState = {
  session: Session;
  user: User;
};

const initialState: AuthState = {
  session: {
    signedIn: false,
  },
  user: {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionSignedIn: (state, action: PayloadAction<boolean>) => {
      state.session.signedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { setSessionSignedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
