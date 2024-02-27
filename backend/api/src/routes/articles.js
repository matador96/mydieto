const ArticleController = require("../controllers/article");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/article/:id",
    middlewares: [],
    method: ArticleController.getById,
  },
  {
    type: "get",
    url: "/api/v1/articles",
    middlewares: [],
    method: ArticleController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/article",
    middlewares: [],
    withTransaction: true,
    method: ArticleController.create,
  },
  {
    type: "put",
    url: "/api/v1/article/:id",
    middlewares: [],
    withTransaction: true,
    method: ArticleController.update,
  },
];
