const UserController = require("../controllers/user");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "get",
    url: "/api/v1/user/logout",
    middlewares: [],
    method: UserController.logout,
  },
  {
    type: "post",
    url: "/api/v1/user/login",
    middlewares: [UserController.validate("login"), validationChecker],
    method: UserController.login,
  },
  {
    type: "get",
    url: "/api/v1/user",
    middlewares: [authenticate],
    method: UserController.get,
  },
  {
    type: "get",
    url: "/api/v1/user/:id/reset",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_reset_password_of_users),
      UserController.validate("reset"),
      validationChecker,
    ],
    method: UserController.reset,
  },

  {
    type: "get",
    url: "/api/v1/users",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_users),
      UserController.validate("getUsersWithParams"),
      validationChecker,
    ],
    method: UserController.getUsersWithParams,
  },

  {
    type: "post",
    url: "/api/v1/user",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_users),
      UserController.validate("create"),
      validationChecker,
    ],
    method: UserController.create,
  },

  {
    type: "put",
    url: "/api/v1/user/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_users),
      UserController.validate("update"),
      validationChecker,
    ],
    method: UserController.update,
  },

  {
    type: "delete",
    url: "/api/v1/user/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_users),
      UserController.validate("delete"),
      validationChecker,
    ],
    method: UserController.delete,
  },
];
