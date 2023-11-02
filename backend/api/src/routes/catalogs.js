const CatalogController = require("../controllers/catalog");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/catalog/:id",
    middlewares: [authenticate, validationChecker],
    method: CatalogController.getById,
  },
  {
    type: "get",
    url: "/api/v1/catalogs",
    middlewares: [authenticate, validationChecker],
    method: CatalogController.getWithParams,
  },
  {
    type: "post",
    url: "/api/v1/catalog",
    middlewares: [],
    withTransaction: true,
    method: CatalogController.create,
  },
  {
    type: "put",
    url: "/api/v1/catalog/:id",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: CatalogController.update,
  },
  {
    type: "get",
    url: "/api/v1/catalogs/parent/:parentId",
    middlewares: [authenticate, validationChecker],
    method: CatalogController.getCatalogsWithParamsByParentId,
  },
];
