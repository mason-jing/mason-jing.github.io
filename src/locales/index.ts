import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

export default i18n;
