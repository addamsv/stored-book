import { classes } from "resources/lib/classNames/classes";
import { memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from "react";
import { useInfiniteScroll } from "resources/hooks/useInfiniteScroll";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { getScrollPosByPath, scrollPointActions } from "features/ScrollPoint";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateSchema } from "resources/store/StoreProvider";
import { useThrottle } from "resources/hooks/useThrottle";
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
    <div
      ref={intersectWrap}
      onScroll={onScrollHandler}
      className={classes(cls.Page, {}, [className])}
    >
      {children}

      { onNextChunk ? <div ref={intersectInner} /> : null }
    </div>
  );
});
