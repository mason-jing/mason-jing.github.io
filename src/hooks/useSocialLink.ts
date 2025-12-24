import { SOCIAL_LINKS } from "@/config";
import { useDeepLink } from "./useDeepLink";
import type { DeepLinkHandler, UseDeepLinkOptions } from "./useDeepLink";

export interface UseSocialLinkReturn {
    handleInstagramClick: DeepLinkHandler;
    handleLinkedInClick: DeepLinkHandler;
}

const useDeepLinkOptions: UseDeepLinkOptions = {
    enableFallback: false,
    fallbackDelayMs: 2000,
};

export const useSocialLink = (): UseSocialLinkReturn => {
    const handleInstagramClick: DeepLinkHandler = useDeepLink(
        SOCIAL_LINKS.instagram.webUrl,
        SOCIAL_LINKS.instagram.appUrl,
        useDeepLinkOptions,
    );

    const handleLinkedInClick: DeepLinkHandler = useDeepLink(
        SOCIAL_LINKS.linkedin.webUrl,
        SOCIAL_LINKS.linkedin.appUrl,
        useDeepLinkOptions,
    );

    return { handleInstagramClick, handleLinkedInClick };
};
