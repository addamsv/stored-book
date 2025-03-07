import { useTranslation } from "react-i18next";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { Page } from "widgets/Page/Page";
import { Text, TextAlign, TextSize } from "shared/Text";
import { HFlex } from "shared/Flex/HFlex";
import cls from "./Help.module.scss";

interface IHelpStepItem {
  link: string;
  title?: string;
  description?: string;
}

const list: IHelpStepItem[] = [
  { link: "/images/step_1.jpg", title: "step 1", description: "" },
  { link: "/images/step_2.jpg", title: "step 2", description: "" },
  { link: "/images/step_3.jpg", title: "step 3", description: "" },
  { link: "/images/step_4.jpg", title: "step 4", description: "" },
  { link: "/images/step_5.jpg", title: "step 5", description: "" },
  { link: "/images/step_6.jpg", title: "step 6", description: "" },
  { link: "/images/step_7.jpg", title: "step 7", description: "" },
  { link: "/images/step_8.jpg", title: "step 8", description: "" },
  { link: "/images/step_9.jpg", title: "step 9", description: "" },
  { link: "/images/step_10.jpg", title: "step 10", description: "" },
  { link: "/images/step_11.jpg", title: "step 11", description: "" }
];

const render = (item: IHelpStepItem) => (
  <img key={item.link} width={280} height={480} src={item.link} alt={item.title} />
);

const Help = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Card className={cls.helpWrapper}>
        <VFlex gap="8">
          <Text textAlign={TextAlign.LEFT} textSize={TextSize.L} title="FAQ" />
          <Text textAlign={TextAlign.LEFT} text="How to download a link?" />
          <HFlex className={cls.flexWrap} gap="16">
            {list.map((item) => render(item))}
          </HFlex>
        </VFlex>
      </Card>
    </Page>
  );
};

export default Help;
