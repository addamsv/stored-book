import { classes } from "shared/lib/classNames/classes";
import { memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { getScrollPosByPath, scrollPointActions } from "features/ScrollPoint";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle";
import cls from "./Page.module.scss";

interface IPageProps {
  className?: string;
  children?: ReactNode;
  onNextChunk?: () => void;
}

export const Page = memo(({ className, children, onNextChunk }: IPageProps) => {
  const intersectWrap = useRef() as MutableRefObject<HTMLDivElement>;
  const intersectInner = useRef() as MutableRefObject<HTMLDivElement>;

  const location = useLocation();

  const scrollTopPos = useSelector((state: IStateSchema) => getScrollPosByPath(state, location.pathname));

  const dispatch = useAppDispatch();

  useInfiniteScroll({
    intersectWrap,
    intersectInner,
    callback: onNextChunk
  });

  useEffect(() => {
    intersectWrap.current.scrollTop = scrollTopPos;
  }, [scrollTopPos]);

  const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollPointActions.setScrollPos({
      path: location.pathname,
      pos: e.currentTarget.scrollTop
    }));
  }, 500);

  return (
    <section
      ref={intersectWrap}
      onScroll={onScrollHandler}
      className={classes(cls.Page, {}, [className])}
    >
      {children}
      <div ref={intersectInner} />
    </section>
  );
});
