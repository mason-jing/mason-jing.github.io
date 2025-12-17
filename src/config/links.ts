import type { SocialLink, SocialPlatform } from "../types";


export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
    instagram: {
        webUrl: "https://www.instagram.com/chubby__orange",
        appUrl: "instagram://user?username=chubby__orange",
    },
    linkedin: {
        webUrl: "https://www.linkedin.com/in/mason-jing",
        appUrl: "linkedin://in/mason-jing",
    },
};
