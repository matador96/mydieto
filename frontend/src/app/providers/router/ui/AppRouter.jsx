import { memo, Suspense, useCallback, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';
import { AdminLayout, CenteredLayout, DefaultLayout } from '@widgets/Layout';
import { PageLoader } from '@widgets/PageLoader';
import { routeList, AppLayout } from '@shared/config/routes';
import { useLocation } from 'react-router-dom';

const AppRouter = () => {
   const auth = useSelector(getUserAuthData);
   const { pathname } = useLocation();

   useLayoutEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [pathname]);

   const renderWithWrapper = useCallback(
      (route) => {
         let element = <>{route.element}</>;

         element = <DefaultLayout>{route.element}</DefaultLayout>;

         if (route.layout === AppLayout.adminLayout) {
            element = <AdminLayout>{route.element}</AdminLayout>;
         }

         if (route.layout === AppLayout.centered) {
            element = <CenteredLayout>{route.element}</CenteredLayout>;
         }

         return (
            <Route
               element={
                  element
                  // route.authOnly ? (
                  //    <RequireAuth permission={route.permission}>
                  //       {element}
                  //    </RequireAuth>
                  // ) : (
                  //    element
                  // )
               }
               exact={!!route.exact}
               key={route.path}
               path={route.path}
            />
         );
      },
      [auth]
   );

   return (
      <Suspense fallback={<PageLoader />}>
         <Routes>{Object.values(routeList).map(renderWithWrapper)}</Routes>
      </Suspense>
   );
};

export default memo(AppRouter);
