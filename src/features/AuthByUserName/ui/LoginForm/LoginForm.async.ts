import { lazy } from "react";

// export const LoginFormAsync = lazy(
//   () => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => resolve(import("./LoginForm")), 500);
//   })
// );

export const LoginFormAsync = lazy(() => import("./LoginForm"));
