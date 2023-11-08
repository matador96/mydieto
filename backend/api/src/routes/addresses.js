const AddressController = require("../controllers/address");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/address/suggestions",
    middlewares: [authenticate, validationChecker],
    method: AddressController.getAddressesWithSuggestions,
  },
  {
    type: "get",
    url: "/api/v1/address/:id",
    middlewares: [authenticate, validationChecker],
    method: AddressController.getById,
  },
  {
    type: "get",
    url: "/api/v1/address",
    middlewares: [authenticate, validationChecker],
    method: AddressController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/address",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: AddressController.create,
  },
  {
    type: "put",
    url: "/api/v1/address/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: AddressController.update,
  },
  {
    type: "delete",
    url: "/api/v1/address/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: AddressController.delete,
  },
];
