import { lazy } from "react";

// export const AuthPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./AuthPage")), 500);
//     })
// );

export const AuthPageAsync = lazy(() => import("./AuthPage"));
