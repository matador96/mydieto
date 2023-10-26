const { body, param, query } = require("express-validator");
const CategoryService = require("../services/categories");
const Validations = require("../const/validatorSettings");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");

module.exports.getCategoryById = async (req) => {
  const { id } = req.params;
  const data = await CategoryService.getById(id);

  return { data };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await CategoryService.deleteCategory({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_CATEGORY,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.getCategoriesWithParamsByParentId = async (req) => {
  const { parentId } = req.params;

  const result = await CategoryService.getWithParamsByParentId({
    ...req.query,
    parentId,
  });

  return { data: result.data, count: result.count };
};

module.exports.getCategoriesWithParams = async (req) => {
  const result = await CategoryService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req) => {
  const data = {
    ...req.body,
  };

  const result = await CategoryService.create(data);

  userLogger(
    loggerActions.CREATE_CATEGORY,
    {
      dataFromRequest: data,
      result: result,
    },
    req,
  );

  return {
    data: result,
  };
};

module.exports.update = async (req) => {
  const { status } = req.body;
  const { id } = req.params;

  const data = await CategoryService.update(
    {
      ...req.body,
    },
    { id },
  );

  if (data.parentId === 0 && status) {
    await CategoryService.update(
      {
        status,
      },
      { parentId: data.id },
    );
  }

  userLogger(
    loggerActions.UPDATE_CATEGORY,
    {
      dataFromRequest: { ...req.body, id },
      result: data,
    },

    req,
  );

  return {
    data: data,
  };
};

const validationCategoryFilterFields = [query("name").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "getCategoryById": {
      return [param("id").isInt()];
    }

    case "getCategoriesWithParamsByParentId": {
      return [
        ...validationCategoryFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "getCategoriesWithParams": {
      return [
        ...validationCategoryFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [body("name").isString(), body("parentId").isInt()];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("name").isString().optional(),
        body("parentId").isInt().optional(),
        body("priority").isInt().optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};
