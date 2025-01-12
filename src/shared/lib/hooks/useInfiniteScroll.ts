import { MutableRefObject, useEffect } from "react";

interface IArgs {
  intersectWrap: MutableRefObject<HTMLElement>;
  intersectInner: MutableRefObject<HTMLElement>;
  callback?: () => void;
}

export function useInfiniteScroll({ callback, intersectInner, intersectWrap }: IArgs) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const { current: root } = intersectWrap;

    const { current: inner } = intersectInner;

    if (callback) {
      const options = { root, rootMargin: "0px", threshold: 0.0 };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(inner);
    }

    return () => {
      if (observer) {
        observer.unobserve(inner);
      }
    };
  }, [callback, intersectInner, intersectWrap]);
}
