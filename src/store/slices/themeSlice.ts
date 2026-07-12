import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { themeConfig } from '@/configs/theme.config';
import type { Theme, LayoutType, Direction } from '@/@types/theme';

const initialState: Theme = {
  ...themeConfig,
  layout: {
    ...themeConfig.layout,
    previousType: '',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSchema: (state, action: PayloadAction<string>) => {
      state.themeSchema = action.payload;
    },
    setMode: (state, action: PayloadAction<Theme['mode']>) => {
      state.mode = action.payload;
    },
    setSideNavCollapse: (state, action: PayloadAction<boolean>) => {
      state.layout.sideNavCollapse = action.payload;
    },
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload;
    },
    setPanelExpand: (state, action: PayloadAction<boolean>) => {
      state.panelExpand = action.payload;
    },
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layout.type = action.payload;
    },
    setPreviousLayout: (state, action: PayloadAction<LayoutType | ''>) => {
      state.layout.previousType = action.payload;
    },
  },
});

export const {
  setSchema,
  setMode,
  setSideNavCollapse,
  setDirection,
  setPanelExpand,
  setLayout,
  setPreviousLayout,
} = themeSlice.actions;
export default themeSlice.reducer;
