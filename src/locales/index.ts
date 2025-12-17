import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import type { SupportedLanguage } from "../types";
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

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

export function normalizeLang(lang?: string): SupportedLanguage {
    return lang?.toLowerCase() === "zh-cn" ? "zh-CN" : "en-US";
}

export function toggleLanguage(
    currentLang: SupportedLanguage,
): SupportedLanguage {
    return currentLang === "en-US" ? "zh-CN" : "en-US";
}

export default i18n;
