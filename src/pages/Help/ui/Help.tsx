import { useTranslation } from "react-i18next";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { Page } from "widgets/Page/Page";
import { Text, TextAlign, TextSize } from "shared/Text";
import { HFlex } from "shared/Flex/HFlex";
import { ListBox } from "shared/ListBox/ListBox";
import cls from "./Help.module.scss";

const Help = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Card className={cls.helpWrapper}>
        <VFlex gap="8">
          <Text textAlign={TextAlign.LEFT} textSize={TextSize.L} title="FAQ" />
          <Text textAlign={TextAlign.LEFT} text="How to download a link?" />
          <HFlex className={cls.flexWrap} gap="16">
            <img width={280} height={480} src="/images/step_1.jpg" alt="step 1" />
            <img width={280} height={480} src="/images/step_2.jpg" alt="step 2" />
            <img width={280} height={480} src="/images/step_3.jpg" alt="step 3" />
            <img width={280} height={480} src="/images/step_4.jpg" alt="step 4" />
            <img width={280} height={480} src="/images/step_5.jpg" alt="step 5" />
            <img width={280} height={480} src="/images/step_6.jpg" alt="step 6" />
            <img width={280} height={480} src="/images/step_7.jpg" alt="step 7" />
            <img width={280} height={480} src="/images/step_8.jpg" alt="step 8" />
            <img width={280} height={480} src="/images/step_9.jpg" alt="step 9" />
            <img width={280} height={480} src="/images/step_10.jpg" alt="step 10" />
            <img width={280} height={480} src="/images/step_11.jpg" alt="step 11" />
          </HFlex>
        </VFlex>
      </Card>
    </Page>
  );
};

export default Help;
