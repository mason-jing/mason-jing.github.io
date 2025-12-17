export type SocialLink = {
    webUrl: string;
    appUrl: string;
};

const socialPlatforms = ["instagram", "linkedin"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];
