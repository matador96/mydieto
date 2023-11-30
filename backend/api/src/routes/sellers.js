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
    url: "/api/v1/seller/addresses",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getAddresses,
  },
  {
    type: "get",
    url: "/api/v1/seller/orders",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getOrdersWithParams,
  },
  {
    type: "post",
    url: "/api/v1/seller/order",
    middlewares: [authenticate, validationChecker],
    method: SellerController.createOrder,
  },
  {
    type: "put",
    url: "/api/v1/seller/order/:id",
    middlewares: [authenticate, validationChecker],
    method: SellerController.updateOrder,
  },
  {
    type: "post",
    url: "/api/v1/seller/address",
    middlewares: [authenticate, validationChecker],
    method: SellerController.createAddress,
  },
  {
    type: "put",
    url: "/api/v1/seller/address/:id",
    middlewares: [authenticate, validationChecker],
    method: SellerController.updateAddress,
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
