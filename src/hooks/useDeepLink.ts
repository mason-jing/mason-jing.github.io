import type { MouseEvent } from "react";

import { useIsMobileDevice } from "./useIsMobileDevice";

export type DeepLinkHandler = (event: MouseEvent<HTMLAnchorElement>) => void;

export interface UseDeepLinkOptions {
    fallbackDelayMs?: number;
}

/**
 * Returns an onClick handler that, on mobile devices, attempts to open a native-app deep link
 * and falls back to opening the web URL if the app cannot be opened.
 *
 * SSR-safe: never touches window/document during render.
 */
export const useDeepLink = (
    webUrl: string,
    appUrl: string,
    options: UseDeepLinkOptions = {},
): DeepLinkHandler => {
    const { fallbackDelayMs = 700 } = options;

    const isMobileDevice = useIsMobileDevice();

    return (event: MouseEvent<HTMLAnchorElement>): void => {
        if (typeof window === "undefined") {
            return;
        }

        // Desktop keeps normal <a> behavior
        if (!isMobileDevice) {
            return;
        }

        event.preventDefault();

        let fallbackTimer: number | undefined;
        let cleanupCalled = false;

        const cleanup = (): void => {
            if (cleanupCalled) {
                return;
            }

            cleanupCalled = true;

            if (fallbackTimer !== undefined) {
                window.clearTimeout(fallbackTimer);
            }

            window.document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };

        const handleVisibilityChange = (): void => {
            if (window.document.visibilityState === "hidden") {
                cleanup();
            }
        };

        window.document.addEventListener(
            "visibilitychange",
            handleVisibilityChange,
        );

        // Fallback to web if the app deep link fails (e.g., app not installed)
        fallbackTimer = window.setTimeout((): void => {
            window.open(webUrl, "_blank", "noopener,noreferrer");
            cleanup();
        }, fallbackDelayMs);

        // Attempt deep link (use href instead of replace to allow confirmation dialogs)
        window.location.href = appUrl;
    };
};
