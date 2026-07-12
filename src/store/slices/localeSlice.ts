import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appConfig from '@/configs/app.config';
import i18n from 'i18next';
import { dateLocales } from '@/locales';
import dayjs from 'dayjs';

const formatLang = (lang: string) => lang.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

export const setLang = createAsyncThunk('locale/setLang', async (lang: string) => {
  const formattedLang = formatLang(lang);

  await i18n.changeLanguage(formattedLang);

  await dateLocales[formattedLang]();
  dayjs.locale(formattedLang);

  return lang;
});

type LocaleState = {
  currentLang: string;
};

const initialState: LocaleState = {
  currentLang: appConfig.locale,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLang.fulfilled, (state, action) => {
      state.currentLang = action.payload;
    });
  },
});

export default localeSlice.reducer;
