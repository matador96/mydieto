const LeadController = require("../controllers/lead");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "get",
    url: "/api/v1/lead/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_leads),
      LeadController.validate("getLeadById"),
      validationChecker,
    ],
    method: LeadController.getLeadById,
  },
  {
    type: "get",
    url: "/api/v1/leads",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_leads),
      LeadController.validate("getLeadsWithParams"),
      validationChecker,
    ],
    method: LeadController.getLeadsWithParams,
  },
  {
    type: "post",
    url: "/api/v1/lead",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_create_leads),
      LeadController.validate("create"),
      validationChecker,
    ],
    withTransaction: true,
    method: LeadController.create,
  },
  {
    type: "put",
    url: "/api/v1/lead/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_leads),
      LeadController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: LeadController.update,
  },
  {
    type: "patch",
    url: "/api/v1/lead/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_leads),
      LeadController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: LeadController.update,
  },
  {
    type: "delete",
    url: "/api/v1/lead/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_leads),
      LeadController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: LeadController.delete,
  },
];
