import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18nForTests from "resources/config/i18n/i18nForTests";

export const RenderI18n = (Component: ReactNode) => {
  return render(
    <I18nextProvider i18n={i18nForTests}>
      {Component}
    </I18nextProvider>
  );
};
