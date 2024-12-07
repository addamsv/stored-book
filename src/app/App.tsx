import "./styles/index.scss";

import { classes } from "shared/lib/classNames/classes";
import { Navbar } from "widgets/Navbar";
import { Footer } from "widgets/Footer";

import { Sidebar } from "widgets/Sidebar";
import { Suspense, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserAuthDataMounted, userActions } from "entities/User";
import { PageLoader } from "entities/PageLoader/PageLoader";
import { AppRouter } from "./providers/router";
import { useTheme } from "./providers/ThemeProvider";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const isAuthDataMounted = useSelector(getUserAuthDataMounted);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classes("app", {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {isAuthDataMounted && <AppRouter />}
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
