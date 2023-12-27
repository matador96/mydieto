const ManagerController = require("../controllers/manager");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/manager/profile",
    middlewares: [authenticate, validationChecker],
    method: ManagerController.getFromSession,
  },
  {
    type: "post",
    url: "/api/v1/manager",
    middlewares: [],
    withTransaction: true,
    method: ManagerController.create,
  },
  {
    type: "put",
    url: "/api/v1/manager/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: ManagerController.update,
  },
];
