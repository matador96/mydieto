const ReviewController = require("../controllers/review");
const { authenticate } = require("../middleware/authenticate");

module.exports = [
  {
    type: "get",
    url: "/api/v1/review/:id",
    middlewares: [],
    method: ReviewController.getById,
  },
  {
    type: "get",
    url: "/api/v1/reviews",
    middlewares: [],
    method: ReviewController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/review",
    middlewares: [authenticate],
    withTransaction: true,
    method: ReviewController.create,
  },
  {
    type: "put",
    url: "/api/v1/review/:id",
    middlewares: [],
    withTransaction: true,
    method: ReviewController.update,
  },
];
