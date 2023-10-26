const DriverController = require("../controllers/driver");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "post",
    url: "/api/v1/driver/login",
    middlewares: [
      apiKeyChecker,
      authenticate,
      DriverController.validate("login"),
      validationChecker,
    ],
    method: DriverController.login,
  },
  {
    type: "get",
    url: "/api/v1/driver/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_drivers),
      DriverController.validate("getDriverById"),
      validationChecker,
    ],
    method: DriverController.getDriverById,
  },
  {
    type: "get",
    url: "/api/v1/driver/:id/generatePassword",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_drivers),
      DriverController.validate("getDriverById"),
      validationChecker,
    ],
    method: DriverController.generatePasswordByDriverId,
  },
  {
    type: "get",
    url: "/api/v1/drivers",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_drivers),
      DriverController.validate("getDriversWithParams"),
      validationChecker,
    ],
    method: DriverController.getDriversWithParams,
  },
  {
    type: "get",
    url: "/api/v1/drivers/mobileNumber/:mobileNumber",
    middlewares: [
      apiKeyChecker,
      authenticate,
      DriverController.validate("checkMobileNumber"),
      validationChecker,
    ],
    method: DriverController.checkMobileNumber,
  },
  {
    type: "post",
    url: "/api/v1/landing/driver",
    middlewares: [
      DriverController.validate("createPendingDriver"),
      validationChecker,
    ],
    withTransaction: true,
    method: DriverController.createPendingDriver,
  },
  {
    type: "post",
    url: "/api/v1/driver",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_drivers),
      DriverController.validate("create"),
      validationChecker,
    ],
    withTransaction: true,
    method: DriverController.create,
  },
  {
    type: "put",
    url: "/api/v1/driver/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_drivers),
      DriverController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: DriverController.update,
  },
  {
    type: "patch",
    url: "/api/v1/driver/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_drivers),
      DriverController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: DriverController.update,
  },
  {
    type: "get",
    url: "/api/v1/deactivate/driver",
    middlewares: [DriverController.validate("deactivate"), validationChecker],
    method: DriverController.deactivate,
  },
  {
    type: "delete",
    url: "/api/v1/driver/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_drivers),
      DriverController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: DriverController.delete,
  },
];
