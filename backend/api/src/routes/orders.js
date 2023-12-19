const OrderController = require("../controllers/order");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/order/:id",
    middlewares: [authenticate, validationChecker],
    method: OrderController.getById,
  },
  {
    type: "get",
    url: "/api/v1/orders",
    middlewares: [authenticate, validationChecker],
    method: OrderController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/order",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderController.create,
  },
  {
    type: "put",
    url: "/api/v1/order/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderController.update,
  },
  {
    type: "get",
    url: "/api/v1/order/:id/send/code",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderController.sendCode,
  },
  {
    type: "get",
    url: "/api/v1/order/:id/check/code/:code",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderController.checkCode,
  },
];
