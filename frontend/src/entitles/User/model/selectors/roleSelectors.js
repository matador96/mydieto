// import { UserRole } from "../consts/consts";

// const isUserAdmin = createSelector(getUserRoles, (roles) =>
//    Boolean(roles?.includes(UserRole.ADMIN)),
// );
// const isUserManager = createSelector(getUserRoles, (roles) =>
//    Boolean(roles?.includes(UserRole.MANAGER)),
// );

// const isUserSupport = createSelector(getUserRoles, (roles) =>
//    Boolean(roles?.includes(UserRole.SUPPORT)),
// );

// export { getUserRoles, isUserAdmin, isUserManager, isUserSupport };
const getUserRoles = [];
const isUserAdmin = false;
const isUserManager = false;

const isUserSupport = false;

const isUserAuthorized = (state) => !!state.user?.id;
const getUserPermissions = (state) => state.user?.permissions || [];

export {
   getUserRoles,
   isUserAdmin,
   isUserManager,
   isUserSupport,
   isUserAuthorized,
   getUserPermissions
};
