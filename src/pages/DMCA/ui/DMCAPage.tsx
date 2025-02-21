/* eslint-disable max-len */
import { useTranslation } from "react-i18next";

import { Card } from "shared/Card/Card";
import { VFlex } from "shared/Flex/VFlex";
import { Text, TextAlign, TextSize } from "shared/Text";
import { Page } from "widgets/Page/Page";
import { Button, ButtonTheme } from "shared/Button/Button";
import cls from "./DMCAPage.module.scss";

const DMCAPage = () => {
  const { t } = useTranslation("DMCA");

  const onContactHandler = () => {
    window.location.href = `mailto:${__CONTACT_US_EMAIL__}`;
  };

  return (
    <Page>
      <Card className={cls.dmcaWrapper}>
        <VFlex gap="8">
          <Text textAlign={TextAlign.LEFT} textSize={TextSize.L} title="How do I report copyright infringement?" />

          <Text textAlign={TextAlign.LEFT} textSize={TextSize.S} text="We require DMCA notices to be submitted" />

          <Text textAlign={TextAlign.LEFT} text="If you believe your copyright has been infringed, we ask you to submit a DMCA Copyright Infringement Notice. Please send your DMCA Notice to us using this email button down below with all the required information so we may investigate and take action as quickly as possible." />

          <Text textAlign={TextAlign.LEFT} title="Please keep in mind the following requirements:" />

          <Text textAlign={TextAlign.LEFT} text="To submit a DMCA Copyright Infringement Notice, you must be the copyright holder or the legal representative of the person being infringed" />

          <Text textAlign={TextAlign.LEFT} text="You must identify the work being infringed (links, image IDs)" />

          <Text textAlign={TextAlign.LEFT} text="Provide links to the infringing work  (links, image IDs)" />

          <Text textAlign={TextAlign.LEFT} text="Provide contact information for yourself" />

          <Text textAlign={TextAlign.LEFT} title="If you would like to report a trademark violation or create a privacy request, please email us:" />

          <Button onClick={onContactHandler} theme={ButtonTheme.ACCENT_OUTLINE}>
            {t("Контакты")}
          </Button>
          {/* <div className={cls.contactUsLink}></div> */}
        </VFlex>

      </Card>
    </Page>
  );
};

export default DMCAPage;
