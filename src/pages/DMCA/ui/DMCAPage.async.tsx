import { lazy } from "react";

// export const DMCAPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./DMCAPage")), 500);
//     })
// );

export const DMCAPageAsync = lazy(() => import("./DMCAPage"));
