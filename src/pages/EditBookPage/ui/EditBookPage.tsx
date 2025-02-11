import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Page } from "widgets/Page/Page";
import { useParams } from "react-router-dom";
import cls from "./EditBookPage.module.scss";

interface IEditBookPageProps {
  className?: string;
}

const EditBookPage = memo(({ className }: IEditBookPageProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{id: string}>();

  const isPageEdit = Boolean(id);

  return (
    <Page className={classes(cls.EditBookPage, {}, [className])}>
      {isPageEdit ? <h1>{`${t("Edit Book")} ${id}`}</h1> : <h1>{t("Add Book")}</h1>}
    </Page>
  );
});

export default EditBookPage;
