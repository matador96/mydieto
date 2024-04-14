const { body, query } = require("express-validator");
const UserService = require("../services/users");
const User = require("../models/users");
const Encrypt = require("../core/encrypt");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../core/auth/jwtConfig");
const Validations = require("../const/validatorSettings");
const Statuses = require("../enums/statuses");
const ClientService = require("../services/clients");
const { comparePassword, cryptPassword } = require("../core/encrypt");
const { ApplicationError } = require("./../classes/Errors");
const { uploadImageFile } = require("../core/s3");

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

module.exports.registerClient = async (req, res, transaction) => {
  const { email, password, mobile } = req.body;

  if (!email && !password) {
    throw new ApplicationError("Email и пароль не задан", {
      path: "controller",
    });
  }

  let user = await ClientService.getOneByFields({ mobile });

  if (user) {
    throw new ApplicationError(
      "Пользователь с таким телефоном уже зарегистрирован",
      {
        path: "controller",
      },
    );
  }

  user = await UserService.getByEmail(email);

  if (user) {
    throw new ApplicationError("Пользователь с таким email уже зарегистрирован", {
      path: "controller",
    });
  }

  const createdUser = await UserService.createUser(
    {
      email: email,
      password: await cryptPassword(password),
    },
    { transaction },
  );

  let imageObj = {};

  if (req?.files?.image) {
    const image = req?.files?.image;
    if (image) {
      imageObj = await uploadImageFile(req?.files?.image);
    }
  }

  await ClientService.create(
    { ...req.body, userId: createdUser.id, ...imageObj },
    { transaction },
  );

  return {
    data: createdUser,
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

  const comparePass = await comparePassword(password, user.password);

  if (!comparePass) {
    throw new ApplicationError("Пароль неверный", {
      path: "controller",
    });
  }

  const payload = { id: user.id };

  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  return {
    jwt: token,
    data: { ...user },
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

  const userInfo = userData;

  return {
    data: { ...userInfo },
  };
};

const validationUserFilterFields = [query("login").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [body("email").isString(), body("password").isString()];
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
