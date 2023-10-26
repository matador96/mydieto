import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout, DashboardLayout, CenteredLayout } from '@widgets/Layout';
import { PageLoader } from '@widgets/PageLoader';
import { routeList, AppLayout } from '@shared/config/routes';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
   const renderWithWrapper = useCallback((route) => {
      let element = <>{route.element}</>;

      if (route.layout === AppLayout.default) {
         element = <DefaultLayout>{route.element}</DefaultLayout>;
      }

      if (route.layout === AppLayout.dashboard) {
         element = <DashboardLayout>{route.element}</DashboardLayout>;
      }

      if (route.layout === AppLayout.centered) {
         element = <CenteredLayout>{route.element}</CenteredLayout>;
      }

      return (
         <Route
            element={
               route.authOnly ? (
                  <RequireAuth permission={route.permission}>{element}</RequireAuth>
               ) : (
                  element
               )
            }
            exact={!!route.exact}
            key={route.path}
            path={route.path}
         />
      );
   }, []);

   return (
      <Suspense fallback={<PageLoader />}>
         <Routes>{Object.values(routeList).map(renderWithWrapper)}</Routes>
      </Suspense>
   );
};

export default memo(AppRouter);
