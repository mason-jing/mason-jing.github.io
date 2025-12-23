import type { MouseEvent } from "react";

import { LINK_TARGET, LINK_REL } from "@/config";
import { useIsMobileDevice } from "./useIsMobileDevice";

export type DeepLinkHandler = (event: MouseEvent<HTMLAnchorElement>) => void;

export interface UseDeepLinkOptions {
    /**
     * Whether to fall back to web URL if app doesn't open.
     * If false, user must manually confirm or reject the app opening dialog.
     * @default false
     */
    enableFallback?: boolean;
    /**
     * Delay before falling back to web URL if app doesn't open (ms).
     * Only used if enableFallback is true.
     * @default 2500
     */
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
    const { enableFallback = false, fallbackDelayMs = 2500 } = options;

    const isMobileDevice: boolean = useIsMobileDevice();

    return (event: MouseEvent<HTMLAnchorElement>): void => {
        if (globalThis.window === undefined) {
            return;
        }

        // Desktop keeps normal <a> behavior
        if (!isMobileDevice) {
            return;
        }

        event.preventDefault();

        let fallbackTimer: number | undefined;
        let cleanupCalled: boolean = false;

        const cleanup = (): void => {
            if (cleanupCalled) {
                return;
            }

            cleanupCalled = true;

            if (fallbackTimer !== undefined) {
                globalThis.window.clearTimeout(fallbackTimer);
            }

            globalThis.window.document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };

        const handleVisibilityChange = (): void => {
            // If page becomes hidden, user likely confirmed opening the app
            if (globalThis.window.document.visibilityState === "hidden") {
                cleanup();
            }
        };

        globalThis.window.document.addEventListener(
            "visibilitychange",
            handleVisibilityChange,
        );

        // Optionally fall back to web if the app deep link fails (e.g., app not installed)
        if (enableFallback) {
            // This gives users time to confirm the app opening dialog
            fallbackTimer = globalThis.window.setTimeout((): void => {
                globalThis.window.open(webUrl, LINK_TARGET, LINK_REL);
                cleanup();
            }, fallbackDelayMs);
        }

        // Attempt deep link
        // Note: This may show a confirmation dialog on some browsers/devices
        // If enableFallback is false, user must manually confirm or reject the dialog
        // If enableFallback is true, users have fallbackDelayMs milliseconds to confirm before fallback to web
        globalThis.window.location.href = appUrl;
    };
};
