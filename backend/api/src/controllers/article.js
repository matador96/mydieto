const { body, param } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");

const ArticleService = require("../services/articles");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const article = await ArticleService.getById(id);

  return { data: article };
};

module.exports.getWithParams = async (req) => {
  const result = await ArticleService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const currentSessionUserId = req?.user?.profile?.id;

  const articleData = {
    ...req.body,
    userId: currentSessionUserId,
  };

  let article = await ArticleService.create(articleData, { transaction });
  return {
    data: article,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  const articleData = {
    ...req.body,
  };

  const article = await ArticleService.update(articleData, { id }, { transaction });

  return {
    data: article,
  };
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
        body("title").isString(),
        body("description").isString(),
        body("content").isString(),
      ];
    }

    case "update": {
      return [
        body("title").isString(),
        body("content").isString(),
        body("description").isString(),
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
