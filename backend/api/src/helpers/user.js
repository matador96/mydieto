const {
  getPermissionsByRoleId,
  getRoleNameByRoleId,
} = require("../config/roleSettings");

const userInfoTemplate = (user) => {
  const roleId = user.roleId;
  const permissions = getPermissionsByRoleId(roleId);
  const role = getRoleNameByRoleId(roleId);

  return { ...user, role, permissions };
};

module.exports = {
  userInfoTemplate,
};
