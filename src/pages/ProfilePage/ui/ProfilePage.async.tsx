import { lazy } from "react";

// export const ProfilePageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./ProfilePage")), 500);
//     })
// );

export const ProfilePageAsync = lazy(() => import("./ProfilePage"));
