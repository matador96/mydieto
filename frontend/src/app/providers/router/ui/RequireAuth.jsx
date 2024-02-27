import { useSelector } from 'react-redux';
import { getUserAuthData, getUserPermissions } from '@entitles/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@shared/config/routes';
import { useMemo } from 'react';

export function RequireAuth({ children, permission }) {
   const auth = useSelector(getUserAuthData);
   const isUserAuthorized = !!auth?.id;

   const location = useLocation();
   const userPermissions = useSelector(getUserPermissions);

   // const hasRequiredPermissions = useMemo(() => {
   //    if (!permission) return true;
   //    return userPermissions.includes(permission);
   // }, [permission, userPermissions]);

   // if (!isUserAuthorized) {
   //    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
   // }

   // if (!hasRequiredPermissions) {
   //    return (
   //       <Navigate
   //          to={RoutePath.not_permission}
   //          state={{ from: location }}
   //          replace
   //       />
   //    );
   // }

   return children;
}
