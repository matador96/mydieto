const UserController = require("../controllers/user");
const { authenticate } = require("../middleware/authenticate");
// const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
// const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "post",
    url: "/api/v1/user/login",
    middlewares: [],
    method: UserController.login,
  },
  {
    type: "get",
    url: "/api/v1/user/logout",
    middlewares: [],
    method: UserController.logout,
  },
  {
    type: "get",
    url: "/api/v1/user",
    middlewares: [authenticate, validationChecker],
    method: UserController.get,
  },
  {
    type: "get",
    url: "/api/v1/users",
    middlewares: [authenticate, validationChecker],
    method: UserController.getUsersWithParams,
  },
  {
    type: "post",
    url: "/api/v1/user",
    middlewares: [
      // authenticate,
      // validationChecker,
    ],
    method: UserController.create,
  },
  {
    type: "put",
    url: "/api/v1/user/:id",
    middlewares: [authenticate, validationChecker],
    method: UserController.update,
  },
];
