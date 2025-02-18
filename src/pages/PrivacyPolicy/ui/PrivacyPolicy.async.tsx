import { lazy } from "react";

// export const PrivacyPolicyAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./PrivacyPolicy")), 500);
//     })
// );

export const PrivacyPolicyAsync = lazy(() => import("./PrivacyPolicy"));
