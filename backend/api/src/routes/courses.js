const CourseController = require("../controllers/course");
const { authenticate } = require("../middleware/authenticate");

module.exports = [
  {
    type: "get",
    url: "/api/v1/course/:id",
    middlewares: [],
    method: CourseController.getById,
  },
  {
    type: "get",
    url: "/api/v1/courses",
    middlewares: [],
    method: CourseController.getWithParams,
  },
  {
    type: "get",
    url: "/api/v1/tags/course",
    middlewares: [],
    method: CourseController.getTags,
  },
  {
    type: "post",
    url: "/api/v1/course",
    middlewares: [authenticate],
    withTransaction: true,
    method: CourseController.create,
  },
  {
    type: "put",
    url: "/api/v1/course/:id",
    middlewares: [],
    withTransaction: true,
    method: CourseController.update,
  },
];
