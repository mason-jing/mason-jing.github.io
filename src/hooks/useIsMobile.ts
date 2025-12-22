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
        globalThis.window === undefined
            ? false
            : globalThis.window.innerWidth < mobileBreakpoint;

    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

    useEffect((): (() => void) | void => {
        if (!globalThis.window?.matchMedia) {
            return;
        }

        const mql: MediaQueryList = globalThis.window.matchMedia(
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
