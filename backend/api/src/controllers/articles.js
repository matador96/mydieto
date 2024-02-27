const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");

const ArticleService = require("../services/article");

module.exports.getWithParams = async (req) => {
  const result = await ArticleService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

const validationSellerFilterFields = [];

module.exports.validate = (method) => {
  switch (method) {
    case "getArticleById": {
      return [param("id").isInt()];
    }

    case "getArticlesWithParams": {
      return [
        ...validationSellerFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("name").isString(),
        body("img").isString(),
        body("unit").isString().optional(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("name").isString().optional(),
        body("img").isString().optional(),
        body("unit").isString().optional(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};
