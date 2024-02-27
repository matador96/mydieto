const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const Encrypt = require("../core/encrypt");

const AdminService = require("../services/admins");
const UserService = require("../services/users");

module.exports.getFromSession = async (req) => {
  const currentSessionUserId = req?.user?.profile?.id;

  if (!currentSessionUserId) {
    throw new ApplicationError("Пользователя нет в сессии", {
      path: "controller",
    });
  }
  const adminData = await AdminService.getByField({
    userId: currentSessionUserId,
  });

  if (!adminData) {
    throw new ApplicationError("Пользователь не активен", {
      path: "controller",
    });
  }

  return {
    data: { ...adminData, type: "admin" },
  };
};

module.exports.getById = async (req) => {
  const { id } = req.params;
  const admin = await AdminService.getById(id);

  return { data: admin };
};

module.exports.getWithParams = async (req) => {
  const result = await AdminService.getWithParams(req.query);
  return { data: result.data, count: result.count };
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
  const data = await AdminService.create(adminData, { transaction });

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const adminData = await AdminService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  return {
    data: adminData,
  };
};
