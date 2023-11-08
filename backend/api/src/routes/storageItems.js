const StorageItemController = require("../controllers/storageItem");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/storageItem/:id",
    middlewares: [authenticate, validationChecker],
    method: StorageItemController.getById,
  },
  {
    type: "get",
    url: "/api/v1/storageItems",
    middlewares: [authenticate, validationChecker],
    method: StorageItemController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/storageItem",
    middlewares: [],
    withTransaction: true,
    method: StorageItemController.create,
  },
  {
    type: "put",
    url: "/api/v1/storageItem/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: StorageItemController.update,
  },
  {
    type: "delete",
    url: "/api/v1/storageItem/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: StorageItemController.delete,
  },
];
