import { useCallback, useRef } from "react";

export const useThrottle = (callback: (...args: any[]) => void, delayMs: number) => {
  const ref = useRef(false);

  return useCallback((...args: any[]) => {
    if (!ref.current) {
      callback(...args);
      ref.current = true;

      setTimeout(() => { ref.current = false; }, delayMs);
    }
  }, [callback, delayMs]);
};
