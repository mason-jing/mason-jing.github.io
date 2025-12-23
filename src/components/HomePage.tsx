import type { JSX } from "react";

import { useTranslation } from "react-i18next";
import type { UseTranslationResponse } from "react-i18next";

import { InstagramLink, LinkedInLink } from "@/components";
import { useCounter, useLanguage } from "@/hooks";
import type { UseCounterReturn, UseLanguageReturn } from "@/hooks";

import "@/styles/HomePage.scss";

export default function HomePage(): JSX.Element {
    const { t }: UseTranslationResponse<"translation", undefined> =
        useTranslation();
    const { count, loading, handleClick }: UseCounterReturn = useCounter();
    const { handleToggle }: UseLanguageReturn = useLanguage();

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
