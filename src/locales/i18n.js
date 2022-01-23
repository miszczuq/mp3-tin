import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { DICTIONARY_PL } from "./pl/dictionary";
import { DICTIONARY_EN } from "./en/dictionary";

    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: DICTIONARY_EN
                },
                pl: {
                    translation: DICTIONARY_PL
                }
            }
        });

export { i18n };
