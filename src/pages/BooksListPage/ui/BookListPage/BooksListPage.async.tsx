import { lazy } from "react";

// export const BooksListPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./BooksListPage")), 500);
//     })
// );

export const BooksListPageAsync = lazy(() => import("./BooksListPage"));
