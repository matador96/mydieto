const OrderItemController = require("../controllers/orderItem");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/orderItem/:id",
    middlewares: [authenticate, validationChecker],
    method: OrderItemController.getById,
  },
  {
    type: "get",
    url: "/api/v1/orderItems",
    middlewares: [authenticate, validationChecker],
    method: OrderItemController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/orderItem",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderItemController.create,
  },
  {
    type: "put",
    url: "/api/v1/orderItem/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderItemController.update,
  },
  {
    type: "patch",
    url: "/api/v1/orderItem/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: OrderItemController.update,
  },
];
