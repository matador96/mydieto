import { AuthPage, LogoutPage } from '@pages/general/auth';
import NotFoundPage from '@pages/general/notfound';
import NotPermissionPage from '@pages/general/notpermission';

import AdminMainPage from '@pages/admin/index';
import UserMainPage from '@pages/user/index';
import MainPage from '@pages/general/main/index';

import ArticleList from '@pages/general/article/list';
import ArticleById from '@pages/general/article/byId';

import ManageArticlesPage from '@pages/admin/articles';
import ManageUsersPage from '@pages/admin/users';
import ManageInstructorsPage from '@pages/admin/instructors';
import ManageFaqsPage from '@pages/admin/faqs';

const AppRoutes = {
   MAIN: 'main',
   PROFILE: 'profile',
   // General
   LOGIN: 'login',
   REGISTER: 'register',
   LOGOUT: 'logout',
   NOT_FOUND: 'not_found',
   NOT_PERMISSION: 'not_permission',
   ARTICLES: 'articles',
   ARTICLE: 'article',
   // Admin
   ADMIN_PROFILE: 'admin-profile',
   ADMIN_USERS: 'admin-users',
   ADMIN_INSTRUCTORS: 'admin-instructors',
   ADMIN_ARTICLES: 'admin-articles',
   ADMIN_FAQ: 'admin-faq',
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
   [AppRoutes.ARTICLES]: '/articles',
   [AppRoutes.ARTICLE]: '/articles/:id',
   // ADMIN
   [AppRoutes.ADMIN_DASHBOARD]: '/admin/dashboard',
   [AppRoutes.ADMIN_USERS]: '/admin/users',
   [AppRoutes.ADMIN_INSTRUCTORS]: '/admin/instructors',
   [AppRoutes.ADMIN_ARTICLES]: '/admin/articles',
   [AppRoutes.ADMIN_FAQ]: '/admin/faq',
   [AppRoutes.ADMIN_CATEGORIES]: '/admin/categories'
};

export const routeList = {
   [AppRoutes.MAIN]: {
      path: RoutePath[AppRoutes.MAIN],
      element: <MainPage />,
      layout: AppLayout.defaultLayout,
      authOnly: true
   },
   [AppRoutes.ADMIN_DASHBOARD]: {
      path: RoutePath[AppRoutes.ADMIN_DASHBOARD],
      element: <AdminMainPage />,
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

   [AppRoutes.ADMIN_FAQ]: {
      path: RoutePath[AppRoutes.ADMIN_FAQ],
      element: <ManageFaqsPage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   [AppRoutes.ADMIN_INSTRUCTORS]: {
      path: RoutePath[AppRoutes.ADMIN_INSTRUCTORS],
      element: <ManageInstructorsPage />,
      layout: AppLayout.adminLayout,
      authOnly: true
   },

   [AppRoutes.ARTICLES]: {
      path: RoutePath[AppRoutes.ARTICLES],
      element: <ArticleList />,
      layout: AppLayout.defaultLayout
   },

   [AppRoutes.ARTICLE]: {
      path: RoutePath[AppRoutes.ARTICLE],
      element: <ArticleById />,
      layout: AppLayout.defaultLayout
   },

   // [AppRoutes.PROFILE]: {
   //    path: RoutePath[AppRoutes.PROFILE],
   //    element: <ProfilePage />,
   //    authOnly: true
   // },
   [AppRoutes.LOGIN]: {
      path: RoutePath[AppRoutes.LOGIN],
      element: <AuthPage isLoginForm={true} />,
      layout: AppLayout.defaultLayout
   },
   [AppRoutes.REGISTER]: {
      path: RoutePath[AppRoutes.REGISTER],
      element: <AuthPage isLoginForm={false} />,
      layout: AppLayout.defaultLayout
   },
   [AppRoutes.LOGOUT]: {
      path: RoutePath[AppRoutes.LOGOUT],
      element: <LogoutPage />,
      layout: AppLayout.defaultLayout,
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
