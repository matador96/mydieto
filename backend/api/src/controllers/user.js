const { body, param, query } = require("express-validator");
const UserService = require("../services/users");
const Encrypt = require("../core/encrypt");
const Mailer = require("../core/mailer");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../core/auth/jwtConfig");
const loggerActions = require("./../enums/loggerActions");
const { userLogger } = require("../core/logger");
const { allRoles, getRoleId, roleIds } = require("../config/roleSettings");
const {
  generateLoginAndPassword,
  generateRandomWord,
} = require("../helpers/generate");
const { userInfoTemplate } = require("../helpers/user");
const Validations = require("../const/validatorSettings");
const Statuses = require("../enums/statuses");
const { isBlocked } = require("../helpers/status");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getUsersWithParams = async (req) => {
  const result = await UserService.getUsersWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.delete = async (req) => {
  const { id } = req.params;

  const currentSessionId = req?.user?.profile.id;
  if (currentSessionId === parseInt(id)) {
    throw new ApplicationError("Нельзя удалить самого себя", {
      path: "controller",
    });
  }

  await UserService.deleteUser({ id });

  userLogger(
    loggerActions.DELETE_USER,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.reset = async (req) => {
  const { id } = req.params;
  const password = generateRandomWord();

  const updatedUser = await UserService.updateUser(
    {
      password: await Encrypt.cryptPassword(password),
    },
    { id },
  );

  const email = updatedUser.email;
  if (email) {
    await Mailer.notifyAboutChangingCredentials(email, {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      login: updatedUser.login,
      password: password,
    });
  }

  userLogger(
    loggerActions.RESET_USER,
    {
      dataFromRequest: { id },
      result: updatedUser,
    },
    req,
  );

  return {
    data: { password },
  };
};

module.exports.create = async (req, res) => {
  // const { role } = req.body;

  // if (!allRoles.includes(role)) {
  //   return res.status(401).json({ message: "Такой роли не существует" });
  // }

  // // TODO Написать позже проверка сгенерированных логинов на наличие в бд
  // const generatedUserData = generateLoginAndPassword();
  // const roleId = parseInt(getRoleId(role));

  const userData = {
    ...req.body,
  };

  // if (req?.user?.profile.roleId > roleId) {
  //   throw new ApplicationError("Нельзя ставить роли выше своего", {
  //     path: "controller",
  //   });
  // }

  // const email = userData.email;
  // if (email) {
  //   await Mailer.notifyAboutChangingCredentials(email, {
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     login: userData.login,
  //     password: userData.password,
  //   });
  // }

  const createdUser = await UserService.createUser({
    ...userData,
    password: await Encrypt.cryptPassword(userData.password),
  });

  // userLogger(
  //   loggerActions.CREATE_USER,
  //   {
  //     dataFromRequest: req.body,
  //     result: createdUser,
  //   },
  //   req,
  // );

  return {
    data: userData,
  };
};

module.exports.update = async (req, res) => {
  //const { role, status, login } = req.body;
  const { id } = req.params;
  const { status } = req.body;

  // if (role && !allRoles.includes(role)) {
  //   return res.status(401).json({ message: "Такой роли не существует" });
  // }

  // const roleId = parseInt(getRoleId(role));
  // const currentSessionRoleId = req?.user?.profile.roleId;

  // const prevDataChangedUser = await UserService.getUserById(id);
  //
  if (status === Statuses.BLOCKED) {
    if (id == req?.user?.profile?.id) {
      throw new ApplicationError("Нельзя ставить себе статус заблокирован", {
        path: "controller",
      });
    }

    // if (currentSessionRoleId > prevDataChangedUser.roleId) {
    //   throw new ApplicationError(
    //     "Нельзя ставить статус заблокирован супер админам",
    //     {
    //       path: "controller",
    //     },
    //   );
    // }
  }

  // if (roleId) {
  //   if (currentSessionRoleId > roleId) {
  //     throw new ApplicationError("Нельзя ставить роли выше своего", {
  //       path: "controller",
  //     });
  //   }
  //
  //   if (prevDataChangedUser.roleId < currentSessionRoleId) {
  //     throw new ApplicationError(
  //       "Нельзя менять роль у пользователя у которого роль выше чем у вас",
  //       {
  //         path: "controller",
  //       },
  //     );
  //   }
  //
  //   if (currentSessionRoleId > roleId) {
  //     throw new ApplicationError("Нельзя ставить роли выше своего", {
  //       path: "controller",
  //     });
  //   }
  // }

  // if (login) {
  //   const user = await UserService.getUserByLogin(login);
  //
  //   if (user) {
  //     throw new ApplicationError("Такой логин уже существует", {
  //       path: "controller",
  //     });
  //   }
  // }

  const userObj = { ...req.body };

  // if (roleId !== undefined && roleId > -1) {
  //   userObj.roleId = roleId;
  // }

  const userData = await UserService.updateUser({ ...userObj }, { id });

  // userLogger(
  //   loggerActions.UPDATE_USER,
  //   {
  //     dataFromRequest: { ...req.body, id },
  //     result: userData,
  //   },
  //   req,
  // );

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

  // if (isBlocked(user)) {
  //   throw new ApplicationError("Пользователь заблокирован", {
  //     path: "controller",
  //   });
  // }

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
    data: { user: user, type: "user" },
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
  const userData = await UserService.getUserById(currentSessionUserId);

  if (!userData) {
    throw new ApplicationError("Пользователь не активен", {
      path: "controller",
    });
  }

  const userInfo = userInfoTemplate(userData);

  return {
    data: userInfo || null,
  };
};

const validationUserFilterFields = [query("login").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("login").isString().optional({ nullable: true }),
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

    case "reset": {
      return [param("id").isInt()];
    }
    case "sendEmail": {
      return [
        param("id").isInt(),
        body("password").isString().optional({ nullable: true }),
      ];
    }
    case "delete": {
      return [param("id").isInt()];
    }

    case "create": {
      return [
        body("role")
          .isString()
          .isIn([...allRoles]),
        body("firstName").isString(),
        body("lastName").isString(),
        body("post").isString().optional(),
      ];
    }

    case "update": {
      return [
        body("role")
          .isString()
          .isIn([...allRoles])
          .optional(),
        body("status")
          .isString()
          .isIn([Statuses.ACTIVE, Statuses.BLOCKED])
          .optional(),
        body("login").isString().optional(),
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("post").isString().optional(),
        body("email").isString().optional(),
      ];
    }

    default:
      break;
  }
};
