import { AuthPage, LogoutPage } from '@pages/auth';
import NotFoundPage from '@pages/notfound';
import NotPermissionPage from '@pages/notpermission';

import WelcomePage from '@pages/main';
import CatalogsPage from '@pages/catalogs';

import UsersPage from '@pages/users';
import LogsPage from '@pages/logs';

import ProfilePage from '@pages/profile';

import { Navigate } from 'react-router-dom';

const AppRoutes = {
   MAIN: 'main',
   AUTH: 'auth',
   LOGOUT: 'logout',
   NOT_FOUND: 'not_found',
   DASHBOARD: 'dashboard',
   USERS: 'users',
   CATALOGS: 'catalogs',
   PROFILE: 'profile',
   LOGS: 'logs',
   NOT_PERMISSION: 'not_permission'
};

export const AppLayout = {
   default: 'default',
   dashboard: 'dashboard',
   centered: 'centered'
};

export const RoutePath = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.AUTH]: '/auth',
   [AppRoutes.PROFILE]: '/profile',
   [AppRoutes.LOGOUT]: '/logout',
   [AppRoutes.NOT_FOUND]: '/404',
   [AppRoutes.NOT_PERMISSION]: '/401',
   [AppRoutes.DASHBOARD]: '/dashboard',
   [AppRoutes.USERS]: '/users',
   [AppRoutes.LOGS]: '/logs',
   [AppRoutes.CATALOGS]: '/catalogs'
};

export const routeList = {
   [AppRoutes.MAIN]: {
      path: RoutePath[AppRoutes.MAIN],
      element: <Navigate to={RoutePath.dashboard} />
   },
   [AppRoutes.DASHBOARD]: {
      path: RoutePath[AppRoutes.DASHBOARD],
      element: <WelcomePage />,
      layout: AppLayout.dashboard,
      authOnly: true
   },
   [AppRoutes.CATALOGS]: {
      path: RoutePath[AppRoutes.CATALOGS],
      element: <CatalogsPage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_categories'
   },
   [AppRoutes.USERS]: {
      path: RoutePath[AppRoutes.USERS],
      element: <UsersPage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_users'
   },
   [AppRoutes.PROFILE]: {
      path: RoutePath[AppRoutes.PROFILE],
      element: <ProfilePage />,
      layout: AppLayout.dashboard,
      authOnly: true
   },
   [AppRoutes.LOGS]: {
      path: RoutePath[AppRoutes.LOGS],
      element: <LogsPage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_userlogs'
   },
   [AppRoutes.AUTH]: {
      path: RoutePath[AppRoutes.AUTH],
      element: <AuthPage />,
      layout: AppLayout.centered
   },
   [AppRoutes.LOGOUT]: {
      path: RoutePath[AppRoutes.LOGOUT],
      element: <LogoutPage />,
      layout: AppLayout.dashboard,
      authOnly: true
   },
   [AppRoutes.NOT_FOUND]: {
      path: RoutePath[AppRoutes.NOT_FOUND],
      element: <NotFoundPage />,
      layout: AppLayout.default
   },
   [AppRoutes.NOT_PERMISSION]: {
      path: RoutePath[AppRoutes.NOT_PERMISSION],
      element: <NotPermissionPage />,
      layout: AppLayout.dashboard
   }
};
