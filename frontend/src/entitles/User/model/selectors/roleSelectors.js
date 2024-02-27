const getUserRoles = [];

const isUserAuthorized = (state) => !!state.user?.id;
const isUserAdmin = (state) => state.user?.role === 'admin';
const getUserPermissions = (state) => state.user?.permissions || [];

export { getUserRoles, isUserAdmin, isUserAuthorized, getUserPermissions };
