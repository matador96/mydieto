const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const Encrypt = require("../core/encrypt");
const { isBlocked } = require("../helpers/status");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../core/auth/jwtConfig");

const AdminService = require("../services/admins");
const UserService = require("../services/users");

module.exports.getFromSession = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  if (!currentSessionUserId) {
    throw new ApplicationError("Пользователя нет в сессии", {
      path: "controller",
    });
  }
  const sellerData = await AdminService.getByField({
    userId: currentSessionUserId,
  });

  if (!sellerData) {
    throw new ApplicationError("Пользователь не активен", {
      path: "controller",
    });
  }

  return {
    data: sellerData,
  };
};

module.exports.getById = async (req) => {
  const { id } = req.params;
  const seller = await AdminService.getById(id);

  return { data: seller };
};

module.exports.getWithParams = async (req) => {
  const result = await AdminService.getAdminsWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.login = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApplicationError("Email и пароль не задан", {
      path: "controller",
    });
  }

  const user = await UserService.getByEmail(email);

  if (!user) {
    throw new ApplicationError("Данные не верны", {
      path: "controller",
    });
  }

  const comparePass = await Encrypt.comparePassword(password, user.password);

  if (!comparePass) {
    throw new ApplicationError("Пароль неверный", {
      path: "controller",
    });
  }

  if (isBlocked(user)) {
    throw new ApplicationError("Пользователь заблокирован", {
      path: "controller",
    });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  // const obj = {};
  // obj.user = { profile: user };
  //
  // userLogger(
  //   loggerActions.AUTH,
  //   {
  //     dataFromRequest: {},
  //     result: {},
  //   },
  //   obj,
  // );

  return {
    jwt: token,
    data: { user: user, type: "admin" },
  };
};

module.exports.logout = async () => {
  return { message: "Успешный выход" };
};

module.exports.create = async (req, res, transaction) => {
  const userData = {
    ...req.body,
    password: await Encrypt.cryptPassword(req.body.password),
  };
  const user = await UserService.createUser(userData, { transaction });

  const adminData = {
    ...req.body,
    userId: user.id,
  };
  const data = await AdminService.createAdmin(adminData, { transaction });

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

  const sellerData = await AdminService.updateAdmin(
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
