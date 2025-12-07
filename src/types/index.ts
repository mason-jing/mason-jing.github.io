export type PageContent = {
    h1: string;
    h2: string;
    button: string;
    p: string;
    toggle: string;
};

export const supportedLanguages = ["en-US", "zh-CN"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
