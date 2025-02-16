import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Input } from "shared/Input/Input";
import { Button } from "shared/Button/Button";
import { useSelector } from "react-redux";
import { useAppDispatch } from "resources/hooks/useAppDispatch";
import { AsyncModule, ReducerListT } from "shared/AsyncModule/AsyncModule";
// import { sendComment } from "../../model/services/sendComment";
import { Text } from "shared/Text";
import { sendCommentFormActions, sendCommentFormReducer } from "../../model/slices";
import { getErrorTextFromSendCommentForm, getTextFromSendCommentForm } from "../../model/selectors";
import cls from "./SendCommentForm.module.scss";

interface ISendCommentFormProps {
  className?: string;
  onSendCommentHandler: (text: string) => void;
}

const reducers: ReducerListT = {
  sendCommentForm: sendCommentFormReducer
};

const SendCommentForm = memo(({ className, onSendCommentHandler }: ISendCommentFormProps) => {
  const { t } = useTranslation();

  const comment = useSelector(getTextFromSendCommentForm);

  const error = useSelector(getErrorTextFromSendCommentForm);

  const dispatch = useAppDispatch();

  const onChangeHandler = useCallback((value: string) => {
    dispatch(sendCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendCommentHandler(comment);
    onChangeHandler("");
  }, [comment, onChangeHandler, onSendCommentHandler]);

  return (
    <AsyncModule reducers={reducers} isRemoveAfterUnmount>
      <div className={classes(cls.SendCommentForm, {}, [className])}>
        <Text text={t("отпрвить комментарий")} />
        <Input
          className={cls.textArea}
          value={comment}
          onChange={onChangeHandler}
        />
        <Button className={cls.sendCommentButton} onClick={onSendHandler}>{t("отправить")}</Button>
      </div>
    </AsyncModule>
  );
});

export default SendCommentForm;
