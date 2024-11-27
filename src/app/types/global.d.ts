declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classnames: IClassNames;
  export = classnames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __REST_API__BASE_URL__: string;
declare const __IS_DEV__: boolean;

type DeepPartial<T> = T extends object
  ? { [P in keyof T]? : DeepPartial<T[P]> }
  : T;
