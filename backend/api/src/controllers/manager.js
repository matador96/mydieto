const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { statusesOfManagers } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const Encrypt = require("../core/encrypt");

const ManagerService = require("../services/managers");
const UserService = require("../services/users");

module.exports.getFromSession = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  if (!currentSessionUserId) {
    throw new ApplicationError("Пользователя нет в сессии", {
      path: "controller",
    });
  }
  const sellerData = await ManagerService.getByFields({
    userId: currentSessionUserId,
  });

  if (!sellerData) {
    throw new ApplicationError("Пользователь не активен", {
      path: "controller",
    });
  }

  return {
    data: { ...sellerData, type: "seller" },
  };
};

module.exports.getById = async (req) => {
  const { id } = req.params;
  const manager = await ManagerService.getById(id);

  return { data: manager };
};

module.exports.getWithParams = async (req) => {
  const result = await ManagerService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const userData = {
    ...req.body,
    password: await Encrypt.cryptPassword(req.body.password),
  };
  const user = await UserService.createUser(userData, { transaction });

  const managerData = {
    ...req.body,
    userId: user.id,
  };
  const data = await ManagerService.create(managerData, { transaction });

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const managerData = await ManagerService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  return {
    data: managerData,
  };
};

//const validationManagerFilterFields = [query("mobile").isString().optional()];

// module.exports.validate = (method) => {
//   switch (method) {
//     case "getSellerById": {
//       return [param("id").isInt()];
//     }
//
//     case "getSellersWithParams": {
//       return [
//         ...validationSellerFilterFields,
//         ...Validations.pagination,
//         ...Validations.sorting,
//       ];
//     }
//
//     case "getSellerByMobile": {
//       return [
//         param("mobile")
//           // eslint-disable-next-line no-useless-escape
//           .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
//           .withMessage("Неправильный ввод телефона"),
//       ];
//     }
//
//     case "create": {
//       return [
//         body("firstName").isString(),
//         body("lastName").isString(),
//         body("surName").isString(),
//         body("organization").isString(),
//         body("email").optional(),
//         body("address").optional(),
//         body("entityCategories").exists(), // в будущем переделать
//         body("mobile").isString(), // .isMobilePhone("ru-RU")
//         body("status").isIn(allStatuses).optional(),
//       ];
//     }
//
//     case "update": {
//       return [
//         param("id").isInt(),
//         body("firstName").isString().optional(),
//         body("lastName").isString().optional(),
//         body("surName").isString().optional(),
//         body("organization").isString().optional(),
//         body("email").isEmail().optional(),
//         body("address").optional(),
//         body("entityCategories").optional(), // в будущем переделать
//         body("mobile").isString().optional(), // .isMobilePhone("ru-RU")
//         body("status").isIn(allStatuses).optional(),
//       ];
//     }
//
//     case "delete": {
//       return [param("id").isInt()];
//     }
//
//     default:
//       break;
//   }
// };
