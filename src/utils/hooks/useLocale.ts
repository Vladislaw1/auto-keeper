import { useEffect } from 'react';
import i18n from 'i18next';
import { useAppSelector } from '@/store/hooks';

const useLocale = () => {
  const currentLang = useAppSelector((state) => state.locale.currentLang);

  useEffect(() => {
    if (i18n.language !== currentLang) {
      const formattedLang = currentLang.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      i18n.changeLanguage(formattedLang);
    }
  }, [currentLang]);

  return {
    locale: currentLang,
  };
};

export default useLocale;
