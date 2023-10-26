const { isHavePermissionInRoleByRoleId } = require("../helpers/role");

module.exports = {
  roleChecker: (permission) => (req, res, next) => {
    if (req.isApiKeyValid) {
      next();
      return;
    }

    const userRoleId = req.user.profile.roleId;

    if (!isHavePermissionInRoleByRoleId(permission, userRoleId)) {
      res.status(403).json({ error: { message: "Нет доступа" } });
      return;
    }

    next();
  },
};
