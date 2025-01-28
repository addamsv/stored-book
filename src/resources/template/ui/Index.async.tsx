import { lazy } from "react";

// export const IndexAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./Index")), 500);
//     })
// );

const IndexAsync = lazy(() => import("./Index"));
