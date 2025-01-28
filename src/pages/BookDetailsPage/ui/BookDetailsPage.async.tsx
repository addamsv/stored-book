import { lazy } from "react";

// export const BookDetailsPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./BookDetailsPage")), 500);
//     })
// );

export const BookDetailsPageAsync = lazy(() => import("./BookDetailsPage"));
