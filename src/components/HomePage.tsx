import { useTranslation } from "react-i18next";

import { SOCIAL_LINKS } from "@/config";
import { useCounter, useLanguage, useSocialLink } from "@/hooks";
import instagramLogo from "@/assets/instagram.svg";
import linkedinLogo from "@/assets/linkedin.svg";

import "@/styles/HomePage.scss";

export default function HomePage() {
    const { t } = useTranslation();
    const { count, loading, handleClick } = useCounter();
    const { handleToggle } = useLanguage();
    const { handleInstagramClick, handleLinkedInClick } = useSocialLink();

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
            <p className="visit-my-profiles">{t("p")}</p>
        </>
    );
}
