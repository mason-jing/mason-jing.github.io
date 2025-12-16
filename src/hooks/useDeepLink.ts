import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";

export type UseDeepLinkOptions = {
    fallbackDelayMs?: number;
};

/**
 * Returns an onClick handler that, on mobile devices, attempts to open a native-app deep link,
 * and falls back to opening the web URL if the app cannot be opened.
 *
 * SSR-safe: it never touches window/document during render.
 */
export function useDeepLink(
    webUrl: string,
    appUrl: string,
    options: UseDeepLinkOptions = {},
): (event: MouseEvent<HTMLAnchorElement>) => void {
    const { fallbackDelayMs = 700 } = options;

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect((): (() => void) | void => {
        if (typeof window === "undefined") {
            return;
        }

        let cancelled = false;

        import("react-device-detect")
            .then((module): void => {
                if (!cancelled) {
                    setIsMobile(module.isMobile);
                }
            })
            .catch((): void => {
                if (!cancelled) {
                    setIsMobile(false);
                }
            });

        return (): void => {
            cancelled = true;
        };
    }, []);

    return useCallback(
        (event: MouseEvent<HTMLAnchorElement>): void => {
            if (typeof window === "undefined") {
                return;
            }

            // Desktop keeps normal <a> behavior
            if (!isMobile) {
                return;
            }

            event.preventDefault();

            let fallbackTimer: number | undefined;

            const cleanup = (): void => {
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

            // Attempt deep link
            window.location.replace(appUrl);
        },
        [appUrl, fallbackDelayMs, isMobile, webUrl],
    );
}
