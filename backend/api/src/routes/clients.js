const ClientController = require("../controllers/client");
const UserController = require("../controllers/user");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/clients",
    middlewares: [],
    withTransaction: true,
    method: ClientController.getWithParams,
  },

  {
    type: "get",
    url: "/api/v1/tags/client",
    middlewares: [],
    method: ClientController.getTags,
  },
  {
    type: "post",
    url: "/api/v1/client",
    middlewares: [],
    withTransaction: true,
    method: ClientController.create,
  },
  {
    type: "post",
    url: "/api/v1/client/register",
    middlewares: [],
    withTransaction: true,
    method: UserController.registerClient,
  },
  {
    type: "put",
    url: "/api/v1/client/:id",
    middlewares: [],
    withTransaction: true,
    method: ClientController.update,
  },
  {
    type: "get",
    url: "/api/v1/client/:id",
    middlewares: [],
    method: ClientController.getById,
  },
];
