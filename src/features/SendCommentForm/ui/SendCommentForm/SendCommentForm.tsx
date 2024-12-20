import { classes } from "shared/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { AsyncModule, ReducerListT } from "shared/lib/AsyncModule/AsyncModule";
import { sendComment } from "../../model/services/sendComment";
import { sendCommentFormActions, sendCommentFormReducer } from "../../model/slices";
import { getErrorTextFromSendCommentForm, getTextFromSendCommentForm } from "../../model/selectors";
import cls from "./SendCommentForm.module.scss";

interface ISendCommentFormProps {
  className?: string;
}

const reducers: ReducerListT = {
  sendCommentForm: sendCommentFormReducer
};

const SendCommentForm = memo(({ className }: ISendCommentFormProps) => {
  const { t } = useTranslation();

  const comment = useSelector(getTextFromSendCommentForm);
  const error = useSelector(getErrorTextFromSendCommentForm);

  const dispatch = useAppDispatch();

  const onchangeHandler = useCallback((value: string) => {
    dispatch(sendCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    dispatch(sendComment());
  }, [dispatch]);

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount>
      <div className={classes(cls.SendCommentForm, {}, [className])}>
        <Input
          className={cls.textArea}
          placeholder={t("текст комментария")}
          value={comment}
          onChange={onchangeHandler}
        />
        <Button onClick={onSendHandler}>{t("отправить")}</Button>
      </div>
    </AsyncModule>
  );
});

export default SendCommentForm;
