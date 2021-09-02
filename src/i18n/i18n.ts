import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import LocizeBackend from "i18next-locize-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import { DateTime } from "luxon";

const {
  NODE_ENV,
  REACT_APP_PROJECT_ID,
  REACT_APP_API_KEY,
  REACT_APP_REFERENCE_LNG,
} = process.env;

const locizeBackendOptions = {
  projectId: REACT_APP_PROJECT_ID!,
  apiKey: REACT_APP_API_KEY!,
  referenceLng: REACT_APP_REFERENCE_LNG!, // en-US
};

const localStorageBackendOptions = {
  // 7 days
  expirationTime: 7 * 24 * 60 * 60 * 1000,
};

const isDev = NODE_ENV === "development";

i18n
  // This is a i18next backend to chain multiple other backends and
  // caches. So you can define an additional caching backend or
  // fallback backends.
  .use(ChainedBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: REACT_APP_REFERENCE_LNG,
    // Output debug logs
    debug: isDev,
    // Chain multiple backends
    backend: {
      backends: [LocalStorageBackend, LocizeBackend],
      backendOptions: [localStorageBackendOptions, locizeBackendOptions],
    },
    // https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb#:~:text=thanks%20to%20the%20use%20of%20the%20savemissing%20functionality%2C%20new%20keys%20gets%20added%20to%20locize%20automatically%2C%20while%20developing%20the%20app.
    // Do not use with https://github.com/i18next/i18next-localstorage-backend#important-advice-for-the-usage-in-combination-with-savemissingupdatemissing
    // saveMissing: isDev,
    interpolation: {
      format: (value, format, language) => {
        if (value instanceof Date) {
          // @ts-ignore
          const dateTimeFormat = DateTime[format];
          return DateTime.fromJSDate(value)
            .setLocale(language!)
            .toLocaleString(dateTimeFormat);
        }

        return value;
      },
    },
  });

export default i18n;
