const { body } = require("express-validator");
const ClientService = require("../services/clients");
const UserService = require("../services/users");
const Encrypt = require("../core/encrypt");

module.exports.getWithParams = async (req) => {
  const result = await ClientService.getWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const { email, password, ...clientData } = req.body;

  const userData = {
    email: email,
    password: await Encrypt.cryptPassword(password),
  };

  const createdUser = await UserService.createUser(userData, { transaction });
  clientData.userId = createdUser.id;
  await ClientService.create(clientData, { transaction });

  return {
    data: createdUser,
  };
};

module.exports.getById = async (req) => {
  const { id } = req.params;
  const data = await ClientService.getById(id);

  return { data };
};

module.exports.getTags = async () => {
  const result = await ClientService.getTags();
  return { data: result.data };
};

module.exports.update = async (req) => {
  const { id } = req.params;
  const userObj = { ...req.body };
  const userData = await ClientService.update({ ...userObj }, { id });

  return {
    data: userData,
  };
};

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [body("email").isString(), body("password").isString()];
    }

    case "create": {
      return [body("firstName").isString(), body("lastName").isString()];
    }

    case "update": {
      return [
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("email").isString().optional(),
      ];
    }

    default:
      break;
  }
};
