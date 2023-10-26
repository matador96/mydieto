const AcceptanceController = require("../controllers/acceptance");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/acceptance/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_acceptances),
      AcceptanceController.validate("getAcceptanceById"),
      validationChecker,
    ],
    method: AcceptanceController.getAcceptanceById,
  },
  {
    type: "get",
    url: "/api/v1/acceptance/mobile/check/:mobile",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_acceptances),
      AcceptanceController.validate("checkExistMobileNumber"),
      validationChecker,
    ],
    method: AcceptanceController.checkExistMobileNumber,
  },
  {
    type: "get",
    url: "/api/v1/acceptances",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_acceptances),
      AcceptanceController.validate("getAcceptancesWithParams"),
      validationChecker,
    ],
    method: AcceptanceController.getAcceptancesWithParams,
  },
  {
    type: "post",
    url: "/api/v1/acceptance",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_acceptances),
      AcceptanceController.validate("createAcceptance"),
      validationChecker,
    ],
    withTransaction: true,
    method: AcceptanceController.createAcceptance,
  },
  {
    type: "put",
    url: "/api/v1/acceptance/:id/active", // only for tg bot
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_acceptances),
      AcceptanceController.validate("activeAcceptance"),
      validationChecker,
    ],
    method: AcceptanceController.activeAcceptance,
  },
  {
    type: "put",
    url: "/api/v1/acceptance/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_acceptances),
      AcceptanceController.validate("updateAcceptance"),
      validationChecker,
    ],
    withTransaction: true,
    method: AcceptanceController.updateAcceptance,
  },
  {
    type: "delete",
    url: "/api/v1/acceptance/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_acceptances),
      AcceptanceController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: AcceptanceController.delete,
  },
];
