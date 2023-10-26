const SellerController = require("../controllers/seller");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/seller/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_sellers),
      SellerController.validate("getSellerById"),
      validationChecker,
    ],
    method: SellerController.getSellerById,
  },
  {
    type: "get",
    url: "/api/v1/sellers",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_sellers),
      SellerController.validate("getSellersWithParams"),
      validationChecker,
    ],
    method: SellerController.getSellersWithParams,
  },
  {
    type: "get",
    url: "/api/v1/seller/mobile/:mobile",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_sellers),
      SellerController.validate("getSellerByMobile"),
      validationChecker,
    ],
    method: SellerController.getSellerByMobile,
  },
  {
    type: "post",
    url: "/api/v1/seller",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_create_sellers),
      SellerController.validate("create"),
      validationChecker,
    ],
    withTransaction: true,
    method: SellerController.create,
  },
  {
    type: "put",
    url: "/api/v1/seller/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_sellers),
      SellerController.validate("update"),
      validationChecker,
    ],
    withTransaction: true,
    method: SellerController.update,
  },
  {
    type: "delete",
    url: "/api/v1/seller/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_sellers),
      SellerController.validate("delete"),
      validationChecker,
    ],
    method: SellerController.delete,
  },
];
