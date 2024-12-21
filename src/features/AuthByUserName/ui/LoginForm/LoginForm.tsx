import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AsyncModule, ReducerListT } from "shared/lib/AsyncModule/AsyncModule";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { loginByUsername } from "../../model/service/loginByUsername/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const reducerList: ReducerListT = {
  loginForm: loginReducer
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onChangeName = useCallback((val: string) => {
    dispatch(loginActions.setUsername(val));
  }, [dispatch]);

  const onChangePass = useCallback((val: string) => {
    dispatch(loginActions.setPassword(val));
  }, [dispatch]);

  /** Temp */
  useEffect(() => {
    onChangeName("admin");
    onChangePass("123");
  }, [onChangeName, onChangePass]);

  const onFormCommit = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <AsyncModule reducers={reducerList}>
      <div className={classes(cls.LoginForm, {}, [className])}>
        <Text title={t("Аутентификация")} theme={TextTheme.LIGHT} />

        {error && <Text text={error} theme={TextTheme.ERROR} />}

        <Input
          placeholder={t("имя пользователя")}
          onChange={onChangeName}
          className={cls.inputEntity}
          value={username}
          theme={InputTheme.LIGHT}
        />
        <Input
          placeholder={t("пароль")}
          onChange={onChangePass}
          type="password"
          className={cls.inputEntity}
          value={password}
          theme={InputTheme.LIGHT}
        />
        <Button
          theme={ButtonTheme.GREEN}
          className={cls.loginBtn}
          onClick={onFormCommit}
          disabled={isLoading}
        >
          {t("войти")}
        </Button>
      </div>
    </AsyncModule>
  );
});

export default LoginForm;
