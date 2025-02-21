import { useTranslation } from "react-i18next";
import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { Page } from "widgets/Page/Page";
import { Text, TextAlign, TextSize } from "shared/Text";
import cls from "./Help.module.scss";

const Help = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Card className={cls.helpWrapper}>
        <VFlex gap="8">
          <Text textAlign={TextAlign.LEFT} textSize={TextSize.L} title="FAQ" />
          <Text textAlign={TextAlign.LEFT} text="How to find a link?" />
        </VFlex>
      </Card>
    </Page>
  );
};

export default Help;
