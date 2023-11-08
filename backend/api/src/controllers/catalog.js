const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");

const CatalogService = require("../services/catalogs");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const catalog = await CatalogService.getById(id);

  return { data: catalog };
};

module.exports.getWithParams = async (req) => {
  const result = await CatalogService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getCatalogsWithParamsByParentId = async (req) => {
  const { parentId } = req.params;

  const result = await CatalogService.getWithParamsByParentId({
    ...req.query,
    parentId,
  });

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const catalogData = {
    ...req.body,
  };
  const data = await CatalogService.create(catalogData, { transaction });

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const catalog = await CatalogService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  return {
    data: catalog,
  };
};

const validationSellerFilterFields = [query("mobile").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "getSellerById": {
      return [param("id").isInt()];
    }

    case "getSellersWithParams": {
      return [
        ...validationSellerFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "getSellerByMobile": {
      return [
        param("mobile")
          // eslint-disable-next-line no-useless-escape
          .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
          .withMessage("Неправильный ввод телефона"),
      ];
    }

    case "create": {
      return [
        body("firstName").isString(),
        body("lastName").isString(),
        body("surName").isString(),
        body("organization").isString(),
        body("email").optional(),
        body("priority").isInt().optional(),
        body("address").optional(),
        body("entityCategories").exists(), // в будущем переделать
        body("mobile").isString(), // .isMobilePhone("ru-RU")
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("surName").isString().optional(),
        body("organization").isString().optional(),
        body("email").isEmail().optional(),
        body("address").optional(),
        body("priority").isInt().optional(),
        body("entityCategories").optional(), // в будущем переделать
        body("mobile").isString().optional(), // .isMobilePhone("ru-RU")
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
