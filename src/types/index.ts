export type PageContent = {
    h1: string;
    h2: string;
    button: string;
    p: string;
    toggle: string;
};

const socialPlatforms = ["instagram", "linkedin"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export type SocialLink = {
    webUrl: string;
    appUrl: string;
};

const supportedLanguages = ["en-US", "zh-CN"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
