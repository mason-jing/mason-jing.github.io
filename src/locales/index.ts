import i18n, { type TFunction } from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

export const i18nInitPromise: Promise<TFunction<"translation", undefined>> =
    i18n.use(initReactI18next).init({
        resources: {
            "en-US": { translation: enUS },
            "zh-CN": { translation: zhCN },
        },
        lng: "en-US", // default language
        fallbackLng: "en-US",
        interpolation: {
            escapeValue: false, // React already escapes
        },
    });
