import { PageLoader } from "entities/PageLoader/PageLoader";
import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutesPropsT, routeConfig } from "resources/router/routeConfig/routeConfig";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
  const wrapper = useCallback((route: AppRoutesPropsT) => {
    const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

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
