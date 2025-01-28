import { lazy } from "react";

// export const AboutPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./AboutPage")), 500);
//     })
// );

export const AboutPageAsync = lazy(() => import("./AboutPage"));
