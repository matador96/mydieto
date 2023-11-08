const storageController = require("../controllers/storage");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/storage",
    middlewares: [authenticate, validationChecker],
    method: storageController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/storage",
    middlewares: [authenticate],
    withTransaction: true,
    method: storageController.add,
  },
  {
    type: "put",
    url: "/api/v1/storage/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: storageController.update,
  },
  {
    type: "get",
    url: "/api/v1/storage/:id",
    middlewares: [authenticate, validationChecker],
    method: storageController.getById,
  },
  {
    type: "delete",
    url: "/api/v1/storage/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: storageController.delete,
  },
];
