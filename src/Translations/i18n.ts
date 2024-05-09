import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

//import + declare vars of translation files
import english from "./en.json"
import arabic from './ar.json'


//creating object with the variables of imported translation files
const resources = {
    en: {
      translation: english,
    },
    ar: {
      translation: arabic,
    }
  };




i18next.use(initReactI18next)
.use(LanguageDetector).init({
    fallbackLng:'en',
    resources,
})

