import { useCallback, useMemo, useState } from "react";

interface IUseHoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverResultT = [boolean, IUseHoverBind];

export const useHover = (): UseHoverResultT => {
  const [isHover, setHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return useMemo(() => [
    isHover,
    { onMouseEnter, onMouseLeave }
  ], [isHover, onMouseEnter, onMouseLeave]);
};
