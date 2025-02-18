import { lazy } from "react";

// export const HelpAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./Help")), 500);
//     })
// );

export const HelpAsync = lazy(() => import("./Help"));
