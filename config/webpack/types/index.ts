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
}

export interface IEnv {
  mode: IMode;
  port: number;
  restBaseUrl: string;
}

export interface IOptions {
  mode: IMode;
  paths: IPaths;
  port: number;
  isDev: boolean;
  restBaseUrl: string;
  projectType: "frontend" | "storybook" | "jest";
}
