import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerToIns?: HTMLElement;
}

export const Portal = ({ children, containerToIns = document.body }: PortalProps) => {
  return createPortal(children, containerToIns);
};
