const SellerController = require("../controllers/seller");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "post",
    url: "/api/v1/seller/login",
    middlewares: [],
    method: SellerController.login,
  },
  {
    type: "get",
    url: "/api/v1/seller/logout",
    middlewares: [],
    method: SellerController.logout,
  },

  {
    type: "get",
    url: "/api/v1/seller/profile",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getFromSession,
  },
  {
    type: "get",
    url: "/api/v1/seller/:id",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getById,
  },
  {
    type: "get",
    url: "/api/v1/sellers",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/seller",
    middlewares: [],
    withTransaction: true,
    method: SellerController.create,
  },
  {
    type: "put",
    url: "/api/v1/seller/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: SellerController.update,
  },
];
