const InstructorController = require("../controllers/instructor");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/instructors",
    middlewares: [],
    withTransaction: true,
    method: InstructorController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/instructor",
    middlewares: [],
    withTransaction: true,

    method: InstructorController.create,
  },
  {
    type: "put",
    url: "/api/v1/instructor/:id",
    middlewares: [],
    withTransaction: true,
    method: InstructorController.update,
  },
  {
    type: "get",
    url: "/api/v1/instructor/:id",
    middlewares: [],
    method: InstructorController.getById,
  },
];
