import { AboutPage } from "pages/AboutPage";
import { BooksListPage } from "pages/BooksListPage";
import { AuthPage } from "pages/AuthPage";
import { MainPage } from "pages/MainPage";
import { Page404 } from "pages/Page404";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";
import { BookDetailsPage } from "pages/BookDetailsPage";
import { EditBookPage } from "pages/EditBookPage";
import { DMCAPage } from "pages/DMCA";
import { Disclaimer } from "pages/Disclaimer";
import { PrivacyPolicy } from "pages/PrivacyPolicy";
import { TermsOfUse } from "pages/TermsOfUse";
import { Help } from "pages/Help";

export type AppRoutesPropsT = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
  BOOKS = "books",
  BOOK_DETAILS = "book_details",
  BOOK_ADD = "book_add",
  BOOK_EDIT = "book_edit",
  DMCA_REPORT = "dmca_report",
  DISCLAIMER = "disclaimer",
  PRIVACY_POLICY = "privacy_policy",
  TERMS_OF_USE = "terms_of_use",
  HELP = "help",
  MAIN = "main",
  ABOUT = "about",
  AUTH = "auth",
  PROFILE = "profile",
  PAGE_404 = "404"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.BOOKS]: "/", // "/books",
  [AppRoutes.BOOK_DETAILS]: "/books/", // + {id}
  [AppRoutes.BOOK_ADD]: "/books/add",
  [AppRoutes.BOOK_EDIT]: "/books/:id/edit",
  [AppRoutes.HELP]: "/help",
  [AppRoutes.MAIN]: "/",
  [AppRoutes.DMCA_REPORT]: "/DMCA_rep",
  [AppRoutes.DISCLAIMER]: "/disclaimer",
  [AppRoutes.PRIVACY_POLICY]: "/privacy_policy",
  [AppRoutes.TERMS_OF_USE]: "/terms_of_use",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/", // + {id}
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.PAGE_404]: "*"
};

export const routeConfig: Record<AppRoutes, AppRoutesPropsT> = {
  [AppRoutes.BOOKS]: {
    path: RoutePath.books,
    //   authOnly: true,
    element: <BooksListPage />
  },
  [AppRoutes.BOOK_DETAILS]: {
    path: `${RoutePath.book_details}:id`,
    //   authOnly: true,
    element: <BookDetailsPage />
  },
  [AppRoutes.BOOK_ADD]: {
    path: `${RoutePath.book_add}`,
    authOnly: true,
    element: <EditBookPage />
  },
  [AppRoutes.BOOK_EDIT]: {
    path: `${RoutePath.book_edit}`,
    authOnly: true,
    element: <EditBookPage />
  },
  [AppRoutes.DISCLAIMER]: { path: RoutePath.disclaimer, element: <Disclaimer /> },
  [AppRoutes.HELP]: { path: RoutePath.help, element: <Help /> },
  [AppRoutes.MAIN]: { path: RoutePath.main, element: <MainPage /> },
  [AppRoutes.ABOUT]: { path: RoutePath.about, element: <AboutPage /> },
  [AppRoutes.DMCA_REPORT]: { path: RoutePath.dmca_report, element: <DMCAPage /> },
  [AppRoutes.PRIVACY_POLICY]: { path: RoutePath.privacy_policy, element: <PrivacyPolicy /> },
  [AppRoutes.TERMS_OF_USE]: { path: RoutePath.terms_of_use, element: <TermsOfUse /> },
  [AppRoutes.AUTH]: { path: RoutePath.auth, element: <AuthPage /> },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    authOnly: true,
    element: <ProfilePage />
  },
  [AppRoutes.PAGE_404]: { path: RoutePath["404"], element: <Page404 /> },
};
