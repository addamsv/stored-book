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
          <Text textAlign={TextAlign.LEFT} text="How to find a link?" />
          {/* <div>sdf</div>
          <div>sdf</div>
          <HFlex>
            <div>sdf</div>
            <ListBox
              onChange={() => console.log()}
              defValue="lang"
              value={undefined}
              items={[
                { value: "1", content: "en", unavailable: false },
                { value: "2", content: "ru", unavailable: false },
                { value: "3", content: "sp", unavailable: false },
                { value: "4", content: "fr", unavailable: true },
                { value: "5", content: "gr", unavailable: false },
              ]}
            />
          </HFlex>
          <div>sdf</div>
          <div>sdf</div>
          <div>sdf</div> */}
        </VFlex>
      </Card>
    </Page>
  );
};

export default Help;
