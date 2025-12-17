import { useEffect, useState } from "react";

/**
 * Returns true if the current device is a mobile device (device-based detection).
 * Uses react-device-detect for user agent detection, not viewport-based.
 *
 * SSR-safe: dynamically imports react-device-detect in useEffect.
 */
export function useIsMobileDevice(): boolean {
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

    useEffect((): (() => void) | void => {
        if (typeof window === "undefined") {
            return;
        }

        let cancelled = false;

        import("react-device-detect")
            .then((module): void => {
                if (!cancelled) {
                    setIsMobileDevice(module.isMobile);
                }
            })
            .catch((): void => {
                if (!cancelled) {
                    setIsMobileDevice(false);
                }
            });

        return (): void => {
            cancelled = true;
        };
    }, []);

    return isMobileDevice;
}
