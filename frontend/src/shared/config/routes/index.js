import { AuthPage, LogoutPage } from '@pages/general/auth';
import NotFoundPage from '@pages/general/notfound';
import NotPermissionPage from '@pages/general/notpermission';

import WelcomePage from '@pages/main';
import CatalogsPage from '@pages/seller/catalogs';
import StoragePage from '@pages/seller/storage';
import LeadsPage from '@pages/seller/leads';

import ManageCatalogsPage from '@pages/admin/catalogs';

import UsersPage from '@pages/admin/users';
import LogsPage from '@pages/admin/logs';

import ProfilePage from '@pages/profile';

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
   ADMIN_USERS: 'admin-users',
   ADMIN_CATALOGS: 'admin-catalogs',
   ADMIN_DASHBOARD: 'admin-dashboard',
   // ADMIN_LOGS: 'admin-logs',
   // Seller
   SELLER_CATALOGS: 'seller-catalogs',
   SELLER_LEADS: 'seller-leads',
   SELLER_STORAGE: 'seller-storage'
};

export const AppLayout = {
   default: 'default',
   dashboard: 'dashboard',
   sellerLayout: 'sellerLayout',
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
   [AppRoutes.ADMIN_DASHBOARD]: '/admin/dashboard',
   [AppRoutes.ADMIN_USERS]: '/admin/users',
   [AppRoutes.ADMIN_CATALOGS]: '/admin/catalogs',
   // [AppRoutes.ADMIN_LOGS]: '/admin/logs',
   [AppRoutes.SELLER_CATALOGS]: '/seller/catalogs',
   [AppRoutes.SELLER_STORAGE]: '/seller/storage',
   [AppRoutes.SELLER_LEADS]: '/seller/leads'
};

export const routeList = {
   [AppRoutes.MAIN]: {
      path: RoutePath[AppRoutes.MAIN],
      element: <Navigate to={RoutePath[AppRoutes.LOGIN]} />
   },
   [AppRoutes.ADMIN_DASHBOARD]: {
      path: RoutePath[AppRoutes.ADMIN_DASHBOARD],
      element: <WelcomePage />,
      layout: AppLayout.dashboard,
      authOnly: true
   },
   [AppRoutes.SELLER_CATALOGS]: {
      path: RoutePath[AppRoutes.SELLER_CATALOGS],
      element: <CatalogsPage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_categories'
   },
   [AppRoutes.SELLER_STORAGE]: {
      path: RoutePath[AppRoutes.SELLER_STORAGE],
      element: <StoragePage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_categories'
   },
   [AppRoutes.SELLER_LEADS]: {
      path: RoutePath[AppRoutes.SELLER_LEADS],
      element: <LeadsPage />,
      layout: AppLayout.dashboard,
      authOnly: true,
      permission: 'can_view_categories'
   },
   [AppRoutes.ADMIN_CATALOGS]: {
      path: RoutePath[AppRoutes.ADMIN_CATALOGS],
      element: <ManageCatalogsPage />,
      layout: AppLayout.dashboard,
      authOnly: true
   },
   [AppRoutes.ADMIN_USERS]: {
      path: RoutePath[AppRoutes.ADMIN_USERS],
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
   // [AppRoutes.ADMIN_LOGS]: {
   //    path: RoutePath[AppRoutes.ADMIN_LOGS],
   //    element: <LogsPage />,
   //    layout: AppLayout.dashboard,
   //    authOnly: true,
   //    permission: 'can_view_userlogs'
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
