import type { SupportedLanguage, PageContent } from "../types";
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

const translations: Record<SupportedLanguage, PageContent> = {
    "en-US": enUS,
    "zh-CN": zhCN,
};

export function normalizeLang(lang?: string): SupportedLanguage {
    return lang?.toLowerCase() === "zh-cn" ? "zh-CN" : "en-US";
}

export function getTranslation(lang: SupportedLanguage): PageContent {
    return translations[lang];
}
