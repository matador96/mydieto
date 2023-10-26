const { body, param, query } = require("express-validator");
const SellerService = require("../services/sellers");
const LeadService = require("../services/leads");
const AddressService = require("../services/addresses");
const Validations = require("../const/validatorSettings");
const EntityCategoriesService = require("../services/entityCategories");
const { allStatuses } = require("../config/statusSettings");
const Statuses = require("../enums/statuses");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getSellerById = async (req) => {
  const { id } = req.params;
  const seller = await SellerService.getSellerById(id);

  return { data: seller };
};

module.exports.getSellersWithParams = async (req) => {
  const result = await SellerService.getSellersWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getSellerByMobile = async (req) => {
  const { mobile } = req.params;
  const seller = await SellerService.getByMobileNumber(mobile);
  return { data: seller };
};

module.exports.create = async (req, res, transaction) => {
  const sellerData = {
    ...req.body,
  };

  const { addresses, entityCategories } = req.body;
  const data = await SellerService.createSeller(sellerData, { transaction });

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategories(
      entityCategories,
      data.id,
      "seller",
      transaction,
    );
  }

  if (addresses) {
    await AddressService.normalizeAddresses(
      addresses,
      data.id,
      "seller",
      transaction,
    );
  }

  userLogger(
    loggerActions.CREATE_SELLER,
    {
      dataFromRequest: sellerData,
      result: data,
    },
    req,
  );

  return {
    data,
  };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await SellerService.deleteSeller({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_SELLER,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.update = async (req, res, transaction) => {
  const { addresses, entityCategories, status } = req.body;
  const { id } = req.params;

  const prevSellerData = await SellerService.getSellerById(id);

  if (addresses) {
    await AddressService.normalizeAddresses(addresses, id, "seller", transaction);
  }

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategories(
      entityCategories,
      id,
      "seller",
      transaction,
    );
  }

  if (prevSellerData.status !== Statuses.ARCHIVE && status === Statuses.ARCHIVE) {
    const count = await LeadService.getActiveOrInWorkLeadsCountOfSellerById(id);

    if (count > 0) {
      throw new ApplicationError(
        "Продавец не может быть отключен, так как его заявка в работе",
        {
          path: "controller",
        },
      );
    }
  }

  const sellerData = await SellerService.updateSeller(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_SELLER,
    {
      dataFromRequest: { ...req.body, id: sellerData.id },
      result: sellerData,
    },
    req,
  );

  return {
    data: sellerData,
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
