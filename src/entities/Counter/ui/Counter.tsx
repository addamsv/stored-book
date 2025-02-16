import { useSelector } from "react-redux";
import { Button, ButtonTheme } from "shared/Button/Button";
import { counterActions } from "entities/Counter/model/slices/counterSlice";

import LikeSVG from "resources/assets/icons/like.svg";
import DislikeSVG from "resources/assets/icons/dislike.svg";

import { memo, useCallback } from "react";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { HFlex } from "shared/Flex/HFlex";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import cls from "./Counter.module.scss";

export const Counter = memo(() => {
  const count = useSelector(getCounterValue);

  const dispatch = useAppDispatch();

  const incHandler = useCallback(() => {
    dispatch(counterActions.increment());
  }, [dispatch]);

  const decHandler = useCallback(() => {
    dispatch(counterActions.decrement());
  }, [dispatch]);

  return (
    <div data-testid="counter" className={cls.Counter}>
      <HFlex>
        <h4 data-testid="counter-value">{count}</h4>
        <Button
          data-testid="counter-inc-button"
          theme={ButtonTheme.CLEAR}
          onClick={incHandler}
        >
          <LikeSVG width={12} className={cls.svgFill} />
        </Button>
        <Button
          data-testid="counter-dec-button"
          theme={ButtonTheme.CLEAR}
          onClick={decHandler}
        >
          <DislikeSVG width={12} className={cls.svgFill} />
        </Button>
      </HFlex>

    </div>
  );
});
