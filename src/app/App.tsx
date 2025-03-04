import "./styles/index.scss";

import { classes } from "resources/lib/classNames/classes";
import { Navbar } from "widgets/Navbar";

import { Sidebar } from "widgets/Sidebar";
import { Suspense, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserAuthDataMounted, userActions } from "entities/User";
import { PageLoader } from "entities/PageLoader/PageLoader";
import { VFlex } from "shared/Flex/VFlex";
import { AppRouter } from "../resources/router";
import { useTheme } from "../resources/store/ThemeProvider";

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

        {/* <Sidebar /> */}

        <VFlex Tag="main">
          {isAuthDataMounted && <AppRouter />}
        </VFlex>

        {/* <Footer /> */}
      </Suspense>
    </div>
  );
};

export default App;
