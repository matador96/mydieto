const { getPermissionsByRoleId } = require("../config/roleSettings");

const isHavePermissionInRoleByRoleId = (permission, roleId) => {
  if (!getPermissionsByRoleId(roleId)?.includes(permission)) {
    return false;
  }

  return true;
};

module.exports = {
  isHavePermissionInRoleByRoleId,
};
