import { useEffect, useState } from "react";

/**
 * Returns true when viewport width is below the breakpoint (responsive detection).
 * Default breakpoint is 768px (tablet and smaller).
 *
 * Uses matchMedia for viewport-based detection, not user agent detection.
 *
 * SSR-safe: guards window access.
 */
export const useIsMobile = (mobileBreakpoint: number = 768): boolean => {
    const getIsMobile = (): boolean =>
        typeof window !== "undefined"
            ? window.innerWidth < mobileBreakpoint
            : false;

    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

    useEffect((): (() => void) | void => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const mql: MediaQueryList = window.matchMedia(
            `(max-width: ${mobileBreakpoint - 1}px)`,
        );

        const onChange = (): void => setIsMobile(mql.matches);

        mql.addEventListener("change", onChange);

        // Sync with current state
        setIsMobile(mql.matches);

        return (): void => mql.removeEventListener("change", onChange);
    }, [mobileBreakpoint]);

    return isMobile;
};
