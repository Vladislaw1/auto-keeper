import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import localeReducer from './slices/localeSlice';
import routeKeyReducer from './slices/routeKeySlice';
import CarsReducer from './slices/cars/cars.slice';
import carCatalogReducer from './slices/car-catalog/car-catalog.slice';

const authPersistConfig = {
  key: 'sessionUser',
  storage,
};

const themePersistConfig = {
  key: 'theme',
  storage,
};

const localePersistConfig = {
  key: 'locale',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  locale: persistReducer(localePersistConfig, localeReducer),
  cars: CarsReducer,
  carCatalog: carCatalogReducer,
  routeKey: routeKeyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
