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
  const { parentId } = req.query;
  if (!Array.isArray(parentId)) {
    req.query.parentId = [parentId];
  }
  const result = await ArticleService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

// module.exports.getArticlesWithParamsByParentId = async (req) => {
//   const { parentId } = req.params;

//   const result = await ArticleService.getWithParamsByParentId({
//     ...req.query,
//     parentId,
//   });

//   return { data: result.data, count: result.count };
// };

module.exports.create = async (req, res, transaction) => {
  const articleData = {
    ...req.body,
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
        body("name").isString(),
        body("img").isString(),
        body("parentId").isInt(),
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
        body("parentId").isInt().optional(),
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
