import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { normalizeLang, toggleLanguage } from "../locales";
import type { SupportedLanguage } from "../types";

export interface UseLanguageReturn {
    handleToggle: () => void;
}

export const useLanguage = (): UseLanguageReturn => {
    const navigate: NavigateFunction = useNavigate();
    const { lang } = useParams<{ lang?: string }>();
    const { i18n } = useTranslation();

    // Sync route param with i18n language
    useEffect((): void => {
        const normalizedLang: SupportedLanguage = normalizeLang(lang);
        if (i18n.language !== normalizedLang) {
            i18n.changeLanguage(normalizedLang).catch((err: unknown): void =>
                console.error("切换语言失败: ", err),
            );
        }
        // Update html lang attribute for language-specific styling
        document.documentElement.lang = normalizedLang;
    }, [lang, i18n]);

    const handleToggle = (): void => {
        navigate(`/${toggleLanguage(normalizeLang(i18n.language))}`, {
            replace: true,
        });
    };

    return { handleToggle };
};
