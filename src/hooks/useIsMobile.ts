import { useEffect, useState } from "react";

/**
 * Responsive helper: returns true when viewport width is below the breakpoint.
 * Default breakpoint is 768px (tablet and smaller).
 */
export function useIsMobile(mobileBreakpoint: number = 768): boolean {
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

        const onChange = (): void => setIsMobile(getIsMobile());

        // Modern + legacy listeners for broader browser support
        if (mql.addEventListener) {
            mql.addEventListener("change", onChange);
        } else if ((mql as any).addListener) {
            (mql as any).addListener(onChange);
        }

        // Sync immediately on mount
        setIsMobile(getIsMobile());

        return (): void => {
            if (mql.removeEventListener) {
                mql.removeEventListener("change", onChange);
            } else if ((mql as any).removeListener) {
                (mql as any).removeListener(onChange);
            }
        };
    }, [mobileBreakpoint]);

    return isMobile;
}
