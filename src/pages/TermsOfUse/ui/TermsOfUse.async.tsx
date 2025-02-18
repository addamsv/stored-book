import { lazy } from "react";

// export const TermsOfUseAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./TermsOfUse")), 500);
//     })
// );

export const TermsOfUseAsync = lazy(() => import("./TermsOfUse"));
