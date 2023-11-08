const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const AddressesService = require("../services/addresses");
const Encrypt = require("../core/encrypt");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../core/auth/jwtConfig");

const SellerService = require("../services/sellers");
const UserService = require("../services/users");

module.exports.getFromSession = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  if (!currentSessionUserId) {
    throw new ApplicationError("Пользователя нет в сессии", {
      path: "controller",
    });
  }
  const sellerData = await SellerService.getByField({
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
  const seller = await SellerService.getById(id);

  return { data: seller };
};

module.exports.getWithParams = async (req) => {
  const result = await SellerService.getWithParams(req.query);
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

  const payload = { ...user };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  return {
    jwt: token,
    data: { user: user, type: "seller" },
  };
};

module.exports.logout = async () => {
  return { message: "Успешный выход" };
};

module.exports.getAddresses = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  const userData = await UserService.getUserById(currentSessionUserId);

  if (!userData?.seller?.id) {
    throw new ApplicationError("Вы делаете запрос не из продавца", {
      path: "controller",
    });
  }

  const result = await AddressesService.getWithParams({
    ...req.query,
    sellerId: userData?.seller?.id,
  });

  return { data: result.data, count: result.count };
};

module.exports.createAddress = async (req, res, transaction) => {
  const currentSessionUserId = req?.user?.profile?.id;

  const userData = await UserService.getUserById(currentSessionUserId);

  if (!userData?.seller?.id) {
    throw new ApplicationError("Вы делаете запрос не из продавца", {
      path: "controller",
    });
  }

  const addressData = {
    ...req.body,
    sellerId: userData?.seller?.id,
  };

  const data = await AddressesService.create(addressData, { transaction });

  return {
    data,
  };
};

module.exports.updateAddress = async (req) => {
  const { id } = req.params;
  const currentSessionUserId = req?.user?.profile?.id;

  const userData = await UserService.getUserById(currentSessionUserId);

  if (!userData?.seller?.id) {
    throw new ApplicationError("Вы делаете запрос не из продавца", {
      path: "controller",
    });
  }

  const data = await AddressesService.update(
    {
      ...req.body,
    },
    { id, sellerId: userData?.seller?.id },
  );

  return { data };
};

module.exports.create = async (req, res, transaction) => {
  const userData = {
    ...req.body,
    password: await Encrypt.cryptPassword(req.body.password),
  };
  const user = await UserService.createUser(userData, { transaction });

  const sellerData = {
    ...req.body,
    userId: user.id,
  };
  const data = await SellerService.create(sellerData, { transaction });

  return {
    data,
  };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await SellerService.deleteSeller({ id }, { transaction });

  return {};
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const sellerData = await SellerService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
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
