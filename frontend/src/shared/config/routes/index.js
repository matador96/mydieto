import { AuthPage, LogoutPage } from '@pages/general/auth';
import NotFoundPage from '@pages/general/notfound';
import NotPermissionPage from '@pages/general/notpermission';

import WelcomePage from '@pages/main';
import ManageArticlesPage from '@pages/admin/articles';
import ManageUsersPage from '@pages/admin/users';

import { Navigate } from 'react-router-dom';

const AppRoutes = {
   MAIN: 'main',
   PROFILE: 'profile',
   // General
   LOGIN: 'login',
   REGISTER: 'register',
   LOGOUT: 'logout',
   NOT_FOUND: 'not_found',
   NOT_PERMISSION: 'not_permission',
   // Admin
   ADMIN_PROFILE: 'admin-profile',
   ADMIN_USERS: 'admin-users',
   ADMIN_ARTICLES: 'admin-articles',
   ADMIN_CATEGORIES: 'admin-categories',
   ADMIN_DASHBOARD: 'admin-dashboard'
};

export const AppLayout = {
   adminLayout: 'adminLayout',
   default: 'defaultLayout',
   centered: 'centered'
};

export const RoutePath = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.LOGIN]: '/login',
   [AppRoutes.REGISTER]: '/register',
   [AppRoutes.PROFILE]: '/profile',
   [AppRoutes.LOGOUT]: '/logout',
   [AppRoutes.NOT_FOUND]: '/404',
   [AppRoutes.NOT_PERMISSION]: '/401',
   // ADMIN
   [AppRoutes.ADMIN_DASHBOARD]: '/admin/dashboard',
   [AppRoutes.ADMIN_USERS]: '/admin/users',
   [AppRoutes.ADMIN_ARTICLES]: '/admin/articles',
   [AppRoutes.ADMIN_CATEGORIES]: '/admin/categories'
};

export const routeList = {
   [AppRoutes.MAIN]: {
      path: RoutePath[AppRoutes.MAIN],
      layout: AppLayout.defaultLayout,
      element: <Navigate to={RoutePath[AppRoutes.ARTICLES]} /> //
   },
   [AppRoutes.ADMIN_DASHBOARD]: {
      path: RoutePath[AppRoutes.ADMIN_DASHBOARD],
      element: <WelcomePage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   [AppRoutes.ADMIN_CATEGORIES]: {
      path: RoutePath[AppRoutes.ADMIN_CATEGORIES],
      element: <ManageArticlesPage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   [AppRoutes.ADMIN_USERS]: {
      path: RoutePath[AppRoutes.ADMIN_USERS],
      element: <ManageUsersPage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   [AppRoutes.ADMIN_ARTICLES]: {
      path: RoutePath[AppRoutes.ADMIN_ARTICLES],
      element: <ManageArticlesPage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   // [AppRoutes.PROFILE]: {
   //    path: RoutePath[AppRoutes.PROFILE],
   //    element: <ProfilePage />,
   //    authOnly: true
   // },
   [AppRoutes.LOGIN]: {
      path: RoutePath[AppRoutes.LOGIN],
      element: <AuthPage isLoginForm={true} />,
      layout: AppLayout.centered
   },
   [AppRoutes.REGISTER]: {
      path: RoutePath[AppRoutes.REGISTER],
      element: <AuthPage isLoginForm={false} />,
      layout: AppLayout.centered
   },
   [AppRoutes.LOGOUT]: {
      path: RoutePath[AppRoutes.LOGOUT],
      element: <LogoutPage />,
      layout: AppLayout.centered,
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
