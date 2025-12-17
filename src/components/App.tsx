import { useState, useEffect } from "react";
import { ref, onValue, set, DataSnapshot } from "firebase/database";
import type { DatabaseReference, Unsubscribe } from "firebase/database";
import { db } from "../lib";
import { useParams, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { normalizeLang, toggleLanguage } from "../locales";
import instagramLogo from "../assets/instagram.svg";
import linkedinLogo from "../assets/linkedin.svg";
import "../styles/App.scss";
import type { SupportedLanguage } from "../types";
import { SOCIAL_LINKS } from "../config";
import { useDeepLink } from "../hooks";

function App() {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const countRef: DatabaseReference = ref(db, "count");
    const navigate: NavigateFunction = useNavigate();
    const { lang } = useParams<{ lang?: string }>();
    const { t, i18n } = useTranslation();

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

    // 从 Firebase 读取全局 count
    useEffect(
        (): Unsubscribe =>
            onValue(countRef, (snapshot: DataSnapshot): void => {
                const value: any = snapshot.val();
                setCount(typeof value === "number" ? value : 0);
                setLoading(false);
            }),
        [countRef],
    );

    // 更新 count 时保存到 Firebase
    const handleClick: () => void = (): void =>
        setCount((prevCount: number): number => {
            const newCount: number = prevCount + 1;
            set(countRef, newCount).catch((err: unknown): void =>
                console.error("保存到 Firebase 失败: ", err),
            );
            return newCount;
        });

    const handleToggle: () => void = (): void => {
        navigate(`/${toggleLanguage(normalizeLang(i18n.language))}`, {
            replace: true,
        });
    };

    const handleInstagramClick = useDeepLink(
        SOCIAL_LINKS.instagram.webUrl,
        SOCIAL_LINKS.instagram.appUrl,
    );

    const handleLinkedInClick = useDeepLink(
        SOCIAL_LINKS.linkedin.webUrl,
        SOCIAL_LINKS.linkedin.appUrl,
    );

    return (
        <>
            <div className="language-toggle-container">
                <button onClick={handleToggle}>{t("toggle")}</button>
            </div>
            <div>
                <a
                    href={SOCIAL_LINKS.instagram.webUrl}
                    target="_blank"
                    onClick={handleInstagramClick}
                    rel="noopener noreferrer"
                >
                    <img
                        src={instagramLogo}
                        className="logo"
                        alt="Instagram logo"
                    />
                </a>
                <a
                    href={SOCIAL_LINKS.linkedin.webUrl}
                    target="_blank"
                    onClick={handleLinkedInClick}
                    rel="noopener noreferrer"
                >
                    <img
                        src={linkedinLogo}
                        className="logo linkedin"
                        alt="LinkedIn logo"
                    />
                </a>
            </div>
            <h1>{t("h1")}</h1>
            <h1>{t("h2")}</h1>
            <div className="card">
                <button
                    className="like-button"
                    onClick={handleClick}
                    disabled={loading}
                >
                    <span style={{ marginRight: "12px" }}>♥️</span>
                    {loading ? t("button") : count}
                </button>
            </div>
            <p className="read-the-docs">{t("p")}</p>
        </>
    );
}

export default App;
