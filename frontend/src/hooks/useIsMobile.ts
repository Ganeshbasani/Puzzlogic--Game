import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const syncIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mediaQueryList.addEventListener("change", syncIsMobile);
    syncIsMobile();

    return () => mediaQueryList.removeEventListener("change", syncIsMobile);
  }, []);

  return Boolean(isMobile);
}
