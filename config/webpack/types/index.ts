export type IMode = "production" | "development";

export interface IPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  i18localesFrom: string;
  i18localesTo: string;
  imagesFrom: string;
  imagesTo: string;
  faviconFrom: string;
  faviconTo: string;
  robotTxtFrom: string;
  robotTxtTo: string;
  sitemapFrom: string;
  sitemapTo: string;
}

export interface IEnv {
  mode: IMode;
  port: number;
  restBaseUrl: string;
  contactUsEmail: string;
}

export interface IOptions {
  mode: IMode;
  paths: IPaths;
  port: number;
  isDev: boolean;
  restBaseUrl: string;
  contactUsEmail: string;
  projectType: "frontend" | "storybook" | "jest";
}
