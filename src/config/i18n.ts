import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'ru'],
    fallbackLng: 'en',
    ns: ['app', 'auth', 'srs'],
    defaultNS: 'app',
    fallbackNS: 'app',

    debug: false,

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false,
    },

    saveMissing: false,
  });

export default i18n;
