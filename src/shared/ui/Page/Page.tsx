import { classes } from "shared/lib/classNames/classes";
import { memo, MutableRefObject, ReactNode, useEffect, useRef } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll";
import cls from "./Page.module.scss";

interface IPageProps {
  className?: string;
  children?: ReactNode;
  onNextChunk?: () => void;
}

export const Page = memo(({ className, children, onNextChunk }: IPageProps) => {
  const intersectWrap = useRef() as MutableRefObject<HTMLDivElement>;
  const intersectInner = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    intersectWrap,
    intersectInner,
    callback: onNextChunk
  });

  return (
    <section ref={intersectWrap} className={classes(cls.Page, {}, [className])}>
      {children}
      <div ref={intersectInner} />
    </section>
  );
});
