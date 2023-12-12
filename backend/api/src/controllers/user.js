const { body, query } = require("express-validator");
const UserService = require("../services/users");
const Encrypt = require("../core/encrypt");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../core/auth/jwtConfig");
const { userInfoTemplate } = require("../helpers/user");
const Validations = require("../const/validatorSettings");
const Statuses = require("../enums/statuses");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getUsersWithParams = async (req) => {
  const result = await UserService.getUsersWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res) => {
  const userData = {
    ...req.body,
  };

  const createdUser = await UserService.createUser({
    ...userData,
    password: await Encrypt.cryptPassword(userData.password),
  });

  return {
    data: createdUser,
  };
};

module.exports.update = async (req) => {
  const { id } = req.params;
  const userObj = { ...req.body };
  const userData = await UserService.updateUser({ ...userObj }, { id });

  return {
    data: userData,
  };
};

module.exports.login = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApplicationError("email и пароль не задан", {
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

  const payload = { id: user.id };

  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  const userInfo = userInfoTemplate(user);
  return {
    jwt: token,
    data: { ...userInfo },
  };
};

module.exports.logout = async () => {
  return { message: "Успешный выход" };
};

module.exports.get = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  if (!currentSessionUserId) {
    throw new ApplicationError("Пользователя нет в сессии", {
      path: "controller",
    });
  }
  const userData = await UserService.getUserById(currentSessionUserId); // избавиться от этого надо, теперь в req.user.profile все хранится

  if (!userData) {
    throw new ApplicationError("Пользователь не активен", {
      path: "controller",
    });
  }

  const userInfo = userInfoTemplate(userData);

  const type = userInfo?.seller?.id ? "seller" : "admin"; // admin or seller

  return {
    data: { ...userInfo, type },
  };
};

const validationUserFilterFields = [query("login").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("email").isString().optional({ nullable: true }),
        body("password").isString().optional({ nullable: true }),
      ];
    }
    case "getUsersWithParams": {
      return [
        ...validationUserFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [body("firstName").isString(), body("lastName").isString()];
    }

    case "update": {
      return [
        body("status")
          .isString()
          .isIn([Statuses.ACTIVE, Statuses.BLOCKED])
          .optional(),
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("email").isString().optional(),
      ];
    }

    default:
      break;
  }
};
