const CategoryController = require("../controllers/category");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/category/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_categories),
      CategoryController.validate("getCategoryById"),
      validationChecker,
    ],
    method: CategoryController.getCategoryById,
  },
  {
    type: "get",
    url: "/api/v1/categories/parent/:parentId",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_categories),
      CategoryController.validate("getCategoriesWithParamsByParentId"),
      validationChecker,
    ],
    method: CategoryController.getCategoriesWithParamsByParentId,
  },
  {
    type: "get",
    url: "/api/v1/categories",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_categories),
      CategoryController.validate("getCategoriesWithParams"),
      validationChecker,
    ],
    method: CategoryController.getCategoriesWithParams,
  },

  {
    type: "post",
    url: "/api/v1/category",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_categories),
      CategoryController.validate("create"),
      validationChecker,
    ],
    method: CategoryController.create,
  },

  {
    type: "put",
    url: "/api/v1/category/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_drivers),
      CategoryController.validate("update"),
      validationChecker,
    ],
    method: CategoryController.update,
  },

  {
    type: "delete",
    url: "/api/v1/category/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_categories),
      CategoryController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: CategoryController.delete,
  },
];
