import { classes } from "resources/lib/classNames/classes";
import { ModalWin } from "shared/ModalWin/ModalWin";
import { Suspense } from "react";
import { Loader } from "shared/Loader/Loader";
import cls from "./LoginModal.module.scss";

import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <ModalWin
      isOpen={isOpen}
      onClose={onClose}
      className={classes(cls.LoginModal, {}, [className])}
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </ModalWin>
  );
};
