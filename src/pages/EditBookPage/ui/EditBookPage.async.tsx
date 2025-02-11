import { lazy } from "react";

// export const EditBookPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./EditBookPage")), 500);
//     })
// );

export const EditBookPageAsync = lazy(() => import("./EditBookPage"));
