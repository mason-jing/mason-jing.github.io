import { SOCIAL_LINKS } from "../config";
import { useDeepLink, type DeepLinkHandler } from "./useDeepLink";

export interface UseSocialLinkReturn {
    handleInstagramClick: DeepLinkHandler;
    handleLinkedInClick: DeepLinkHandler;
}

export const useSocialLink = (): UseSocialLinkReturn => {
    const handleInstagramClick = useDeepLink(
        SOCIAL_LINKS.instagram.webUrl,
        SOCIAL_LINKS.instagram.appUrl,
    );

    const handleLinkedInClick = useDeepLink(
        SOCIAL_LINKS.linkedin.webUrl,
        SOCIAL_LINKS.linkedin.appUrl,
    );

    return { handleInstagramClick, handleLinkedInClick };
};
