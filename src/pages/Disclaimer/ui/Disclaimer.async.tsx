import { lazy } from "react";

// export const DisclaimerAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./Disclaimer")), 500);
//     })
// );

export const DisclaimerAsync = lazy(() => import("./Disclaimer"));
