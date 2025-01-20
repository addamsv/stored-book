import { MutableRefObject, useCallback, useRef } from "react";

export const useDebounce = (callback: (...args: any[]) => void, delayMs: number) => {
  const ref = useRef() as MutableRefObject<any>;

  return useCallback((...args: any[]) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      callback(...args);
    }, delayMs);
  }, [callback, delayMs]);
};
