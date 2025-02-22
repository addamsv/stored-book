import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo, useState } from "react";
import { ITabItem, Tabs } from "shared/Tabs/Tabs";
import { EBookOfHashTagType } from "entities/Book";
import { HFlex } from "shared/Flex/HFlex";

import CloseIcon from "resources/assets/icons/close.svg";
import { IconSVG } from "shared/IconSVG/IconSVG";
import cls from "./HashTagTabs.module.scss";

interface IHashTagTabsProps {
  className?: string;
  activeHashTag: string;
  onTagChange: (tag: EBookOfHashTagType) => void
}

export const HashTagTabs = memo(({ className, activeHashTag, onTagChange }: IHashTagTabsProps) => {
  const { t } = useTranslation();

  const [isVisible, setVisibility] = useState(false);

  const tabs = useMemo<ITabItem[]>(() => [
    { value: EBookOfHashTagType.ALL, content: t("Все") },
    { value: EBookOfHashTagType["Arts & Entertainment"], content: "Arts & Entertainment" },
    { value: EBookOfHashTagType["Biographies & Memoirs"], content: "Biographies & Memoirs" },
    { value: EBookOfHashTagType["Business & Careers"], content: "Business & Careers" },
    { value: EBookOfHashTagType["Children's Audiobooks"], content: "Children's Audiobooks" },
    { value: EBookOfHashTagType["Comedy & Humor"], content: "Comedy & Humor" },
    { value: EBookOfHashTagType["Computers & Technology"], content: "Computers & Technology" },
    { value: EBookOfHashTagType["Education & Learning"], content: "Education & Learning" },
    { value: EBookOfHashTagType.Erotica, content: "Erotica" },
    { value: EBookOfHashTagType["Health & Wellness"], content: "Health & Wellness" },
    { value: EBookOfHashTagType.History, content: "History" },
    { value: EBookOfHashTagType["Home & Garden"], content: "Home & Garden" },
    { value: EBookOfHashTagType["Literature & Fiction"], content: "Literature & Fiction" },
    { value: EBookOfHashTagType["Money & Finance"], content: "Money & Finance" },
    { value: EBookOfHashTagType["Mystery, Thriller & Suspense"], content: "Mystery, Thriller & Suspense" },
    { value: EBookOfHashTagType["Politics & Social Sciences"], content: "Politics & Social Sciences" },
    {
      value: EBookOfHashTagType["Relationships, Parenting & Personal Development"],
      content: "Relationships, Parenting & Personal Development"
    },
    { value: EBookOfHashTagType["Religion & Spirituality"], content: "Religion & Spirituality" },
    { value: EBookOfHashTagType.Romance, content: "Romance" },
    { value: EBookOfHashTagType["Science & Engineering"], content: "Science & Engineering" },
    { value: EBookOfHashTagType["Science Fiction & Fantasy"], content: "Science Fiction & Fantasy" },
    { value: EBookOfHashTagType["Sports & Outdoors"], content: "Sports & Outdoors" },
    { value: EBookOfHashTagType["Teen & Young Adult"], content: "Teen & Young Adult" },
    { value: EBookOfHashTagType["Travel & Tourism"], content: "Travel & Tourism" },
  ], [t]);

  const onHashTagChange = useCallback((value: string) => {
    onTagChange(value as EBookOfHashTagType);
    setVisibility(false);
  }, [onTagChange]);

  const onGenresClick = () => {
    setVisibility(true);
  };

  if (isVisible) {
    return <Tabs tabs={tabs} activeValue={activeHashTag} onClickHandler={onHashTagChange} />;
  }

  return (
    <HFlex gap="8" className={cls.genres}>
      <b>{`${t("genres filter")}:`}</b>

      <div onClick={onGenresClick} className={cls.genresTab}>
        {activeHashTag}
      </div>

      {activeHashTag !== "ALL" && (
        <div onClick={() => onHashTagChange("ALL")}>
          <IconSVG className={cls.closeIcon} Svg={CloseIcon} />
        </div>
      )}

    </HFlex>
  );
});
