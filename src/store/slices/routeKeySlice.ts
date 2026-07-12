import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type RouteKeyState = {
  currentRouteKey: string;
};

const initialState: RouteKeyState = {
  currentRouteKey: '',
};

const routeKeySlice = createSlice({
  name: 'routeKey',
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action: PayloadAction<string>) => {
      state.currentRouteKey = action.payload;
    },
  },
});

export const { setCurrentRouteKey } = routeKeySlice.actions;
export default routeKeySlice.reducer;
