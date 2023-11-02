import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';
import { AdminLayout, CenteredLayout, SellerLayout } from '@widgets/Layout';
import { PageLoader } from '@widgets/PageLoader';
import { routeList, AppLayout } from '@shared/config/routes';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
   const auth = useSelector(getUserAuthData);

   const renderWithWrapper = useCallback(
      (route) => {
         let element = <>{route.element}</>;

         // if (route.layout === AppLayout.default) {
         //    element = <DefaultLayout>{route.element}</DefaultLayout>;
         // }

         if (auth?.type === 'admin') {
            element = <AdminLayout>{route.element}</AdminLayout>;
         }

         if (auth?.type === 'seller') {
            element = <SellerLayout>{route.element}</SellerLayout>;
         }

         if (route.layout === AppLayout.centered) {
            element = <CenteredLayout>{route.element}</CenteredLayout>;
         }

         return (
            <Route
               element={
                  route.authOnly ? (
                     <RequireAuth permission={route.permission}>
                        {element}
                     </RequireAuth>
                  ) : (
                     element
                  )
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
