import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import thJSON from './locale/th.json'

const resources = {
  EN: {
    translation: {
      ...enJSON
    }
  },
  TH: {
    translation: {
     ...thJSON
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "EN",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;