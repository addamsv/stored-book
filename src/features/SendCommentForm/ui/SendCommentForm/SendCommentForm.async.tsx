import { lazy } from "react";

// export const SendCommentFormAsync = lazy(
//   () => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => resolve(import("./SendCommentForm")), 500);
//   })
// );

export const SendCommentFormAsync = lazy(() => import("./SendCommentForm"));
