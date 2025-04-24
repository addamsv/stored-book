import { classes } from "resources/lib/classNames/classes";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { HFlex } from "shared/Flex/HFlex";
import { VFlex } from "shared/Flex/VFlex";
import { Text, TextAlign, TextSize } from "shared/Text";
import { Card } from "shared/Card/Card";
import { useHelpStepsList } from "../../api/helpStepsAPI";
import cls from "./HelpStepsList.module.scss";

interface IHelpStepItem {
  id: number;
  link: string;
  title?: string;
  description?: string;
}

// const list: IHelpStepItem[] = [
//   { id: 1, link: "/images/step_1.jpg", title: "step 1", description: "" },
//   { id: 2, link: "/images/step_2.jpg", title: "step 2", description: "" },
//   { id: 3, link: "/images/step_3.jpg", title: "step 3", description: "" },
//   { id: 4, link: "/images/step_4.jpg", title: "step 4", description: "" },
//   { id: 5, link: "/images/step_5.jpg", title: "step 5", description: "" },
//   { id: 6, link: "/images/step_6.jpg", title: "step 6", description: "" },
//   { id: 7, link: "/images/step_7.jpg", title: "step 7", description: "" },
//   { id: 8, link: "/images/step_8.jpg", title: "step 8", description: "" },
//   { id: 9, link: "/images/step_9.jpg", title: "step 9", description: "" },
//   { id: 10, link: "/images/step_10.jpg", title: "step 10", description: "" },
//   { id: 11, link: "/images/step_11.jpg", title: "step 11", description: "" }
// ];

const render = (item: IHelpStepItem) => {
  if (!item.id) {
    return null;
  }

  const baseURL = `${__REST_API__BASE_URL__}`;

  return (
    <VFlex key={item.id}>
      <Text text={item.title} />
      <Text text={item.description} />
      <img key={item.link} width={280} height={480} src={`${baseURL}${item.link}`} alt={item.title} />
    </VFlex>
  );
};

interface IProps {
  className?: string;
}

export const HelpStepsList = memo(({ className }: IProps) => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useHelpStepsList("HelpList");

  if (isLoading || error) {
    return null;
  }

  const { data: list } = data;

  return (

    <Card className={cls.contentWrapper}>
      <VFlex gap="8">

        <Text textAlign={TextAlign.LEFT} textSize={TextSize.L} title="FAQ" />

        <Text textAlign={TextAlign.LEFT} text="How to download a link?" />

        <HFlex className={cls.flexWrap} gap="16">
          {list.length ? list.map(render) : null}
        </HFlex>

      </VFlex>
    </Card>
  );
});
