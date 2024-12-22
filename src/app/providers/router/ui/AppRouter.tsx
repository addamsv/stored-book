import { PageLoader } from "entities/PageLoader/PageLoader";
import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesPropsT, routeConfig } from "resources/config/routeConfig/routeConfig";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
  const wrapper = useCallback((route: AppRoutesPropsT) => {
    const element = <div className="page-wrapper">{route.element}</div>;

    return (
      <Route
        key={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
        path={route.path}
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(wrapper)}
      </Routes>
    </Suspense>
  );
});
