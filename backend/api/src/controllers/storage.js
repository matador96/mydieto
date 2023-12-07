const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const UserService = require("../services/users");
const { ApplicationError } = require("./../classes/Errors");
const storageService = require("../services/storage");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const storage = await storageService.getById(id);

  return { data: storage };
};

module.exports.getWithParams = async (req) => {
  const result = await storageService.getWithParams({ ...req.query });
  return { data: result.data, count: result.count };
};

module.exports.add = async (req) => {
  const { quantity, catalogId } = req.body;

  const currentSessionUserId = req?.user?.profile?.id;

  const sellerData = await UserService.getUserById(currentSessionUserId);
  const sellerId = sellerData?.seller?.id;

  if (!sellerId) {
    throw new ApplicationError("Нет айди продавца", {
      path: "controller",
    });
  }

  const current = await storageService.getByFields({
    catalogId,
    sellerId,
  });

  if (!current) {
    await storageService.create({ catalogId, quantity, sellerId });
  } else {
    await storageService.update(
      {
        quantity: current.quantity + quantity,
      },
      {
        catalogId,
        sellerId,
      },
    );
  }

  return {};
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const storage = await storageService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  return {
    data: storage,
  };
};

module.exports.delete = async (req) => {
  const { id } = req.params;

  await storageService.delete({ id });

  // userLogger(
  //   loggerActions.DELETE_RATING,
  //   {
  //     dataFromRequest: { id },
  //     result: { id },
  //   },
  //   req,
  // );

  return {};
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
