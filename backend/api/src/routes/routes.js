const RouteController = require("../controllers/route");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");
const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "get",
    url: "/api/v1/route/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_routes),
      RouteController.validate("getRouteById"),
      validationChecker,
    ],
    method: RouteController.getRouteById,
  },
  {
    type: "get",
    url: "/api/v1/routes",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_routes),
      RouteController.validate("getRoutesWithParams"),
      validationChecker,
    ],
    method: RouteController.getRoutesWithParams,
  },
  {
    type: "post",
    url: "/api/v1/route",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_routes),
      RouteController.validate("create"),
      validationChecker,
    ],
    withTransaction: true,
    method: RouteController.create,
  },
  {
    type: "put",
    url: "/api/v1/route/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_routes),
      RouteController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: RouteController.update,
  },
  {
    type: "patch",
    url: "/api/v1/route/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_routes),
      RouteController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: RouteController.update,
  },
  {
    type: "delete",
    url: "/api/v1/route/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_routes),
      RouteController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: RouteController.delete,
  },
];
