import type { JSX } from "react";

import { useTranslation } from "react-i18next";

import { InstagramLink, LinkedInLink } from "@/components";
import { useCounter, useLanguage } from "@/hooks";

import "@/styles/HomePage.scss";

export default function HomePage(): JSX.Element {
    const { t } = useTranslation();
    const { count, loading, handleClick } = useCounter();
    const { handleToggle } = useLanguage();

    return (
        <>
            <div className="language-toggle-container">
                <button onClick={handleToggle}>{t("toggle")}</button>
            </div>
            <div>
                <InstagramLink />
                <LinkedInLink />
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
            <p className="visit-my-profiles">{t("p")}</p>
        </>
    );
}
