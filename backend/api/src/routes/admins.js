const SellerController = require("../controllers/seller");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "post",
    url: "/api/v1/admin/login",
    middlewares: [],
    method: SellerController.login,
  },
  {
    type: "get",
    url: "/api/v1/admin/logout",
    middlewares: [],
    method: SellerController.logout,
  },

  {
    type: "get",
    url: "/api/v1/admin/profile",
    middlewares: [authenticate, validationChecker],
    method: SellerController.getFromSession,
  },
  {
    type: "post",
    url: "/api/v1/admin",
    middlewares: [],
    withTransaction: true,
    method: SellerController.create,
  },
  {
    type: "put",
    url: "/api/v1/admin/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: SellerController.update,
  },
];
