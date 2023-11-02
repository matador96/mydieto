const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const Encrypt = require("../core/encrypt");

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

module.exports.create = async (req, res, transaction) => {
  const catalogData = {
    ...req.body,
  };
  const data = await CatalogService.create(catalogData, { transaction });

  // userLogger(
  //   loggerActions.CREATE_SELLER,
  //   {
  //     dataFromRequest: sellerData,
  //     result: data,
  //   },
  //   req,
  // );

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

  // userLogger(
  //   loggerActions.UPDATE_SELLER,
  //   {
  //     dataFromRequest: { ...req.body, id: sellerData.id },
  //     result: sellerData,
  //   },
  //   req,
  // );

  return {
    data: catalog,
  };
};

const validationSellerFilterFields = [query("mobileNumber").isString().optional()];

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
        body("address").optional(),
        body("entityCategories").exists(), // в будущем переделать
        body("mobileNumber").isString(), // .isMobilePhone("ru-RU")
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
        body("entityCategories").optional(), // в будущем переделать
        body("mobileNumber").isString().optional(), // .isMobilePhone("ru-RU")
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
