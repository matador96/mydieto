const AdminController = require("../controllers/admin");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "post",
    url: "/api/v1/admin/login",
    middlewares: [],
    method: AdminController.login,
  },
  {
    type: "get",
    url: "/api/v1/admin/logout",
    middlewares: [],
    method: AdminController.logout,
  },

  {
    type: "get",
    url: "/api/v1/admin/profile",
    middlewares: [authenticate, validationChecker],
    method: AdminController.getFromSession,
  },
  {
    type: "post",
    url: "/api/v1/admin",
    middlewares: [],
    withTransaction: true,
    method: AdminController.create,
  },
  {
    type: "put",
    url: "/api/v1/admin/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: AdminController.update,
  },
];
