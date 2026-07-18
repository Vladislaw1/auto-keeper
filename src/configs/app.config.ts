export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies';
  enableMock: boolean;
  activeNavTranslation: boolean;
  /** Поки авторизації немає — вимикає гард і завжди показує post-login layout */
  enableAuth: boolean;
};

const appConfig: AppConfig = {
  apiPrefix: '/api',
  authenticatedEntryPath: '/cars',
  unAuthenticatedEntryPath: '/cars',
  locale: 'en',
  accessTokenPersistStrategy: 'cookies',
  enableMock: true,
  activeNavTranslation: false,
  enableAuth: false,
};

export default appConfig;
