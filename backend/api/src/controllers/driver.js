const { body, param, query } = require("express-validator");
const DriverService = require("../services/drivers");
const Validations = require("../const/validatorSettings");
const EntityCategoriesService = require("../services/entityCategories");
const { allStatuses } = require("../config/statusSettings");
const Statuses = require("../enums/statuses");
const { generateRandomNumbers } = require("../helpers/generate");
const Encrypt = require("../core/encrypt");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");
const { ApplicationError } = require("./../classes/Errors");
const NotificationService = require("../services/notifications");
const { notifications } = require("../enums/notifications");

module.exports.generatePasswordByDriverId = async (req) => {
  const { id } = req.params;

  const passwordLength = 5;
  const generatedPassword = generateRandomNumbers(passwordLength);

  await DriverService.updateDriver(
    {
      password: await Encrypt.cryptPassword(generatedPassword),
    },
    { id },
  );

  userLogger(
    loggerActions.GENERATE_PASSWORD_DRIVER,
    {
      dataFromRequest: { ...req.body, id },
      result: {},
    },
    req,
  );
  return { generatedPassword };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await DriverService.deleteDriver({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_DRIVER,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.checkMobileNumber = async (req) => {
  const { mobileNumber } = req.params;
  const driver = await DriverService.getDriverByMobileNumber(mobileNumber);
  const isExist = driver !== null;

  let resultObj = {
    data: isExist,
    driverStatus: driver?.status,
  };

  return resultObj;
};

module.exports.getDriverById = async (req) => {
  const { id } = req.params;
  const driver = await DriverService.getDriverById(id);

  return { data: driver };
};

module.exports.getDriversWithParams = async (req) => {
  const result = await DriverService.getDriversWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.createPendingDriver = async (req, res, transaction) => {
  const { mobileNumber } = req.body;

  const driverWithNumber = await DriverService.getDriverByMobileNumber(mobileNumber);
  const isExist = driverWithNumber !== null;

  if (isExist) {
    throw new ApplicationError("Телефон уже существует в системе", {
      path: "controller",
    });
  }

  const driverData = {
    mobileNumber: mobileNumber,
    status: "pending",
  };

  const driver = await DriverService.createDriver(driverData, { transaction });
  await NotificationService.createNotification(
    {
      ...notifications.DRIVER_FINISH_LEAD,
      title: `Водитель №${driver.id} зарегистрировался`,
      description: `Водитель №${driver.id}(${driver.mobileNumber}) оставил заявку на регистрацию`,
      entityId: driver.id,
    },
    { transaction },
  );

  return { data: driver };
};

module.exports.create = async (req, res, transaction) => {
  const { entityCategories } = req.body;
  const driverData = {
    ...req.body,
  };

  const result = await DriverService.createDriver(driverData, { transaction });

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategories(
      entityCategories,
      result.id,
      "driver",
      transaction,
    );
  }

  userLogger(
    loggerActions.CREATE_DRIVER,
    {
      dataFromRequest: { ...req.body },
      result: result,
    },

    req,
  );

  return {
    data: result,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { entityCategories } = req.body;
  const { id } = req.params;

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategories(
      entityCategories,
      id,
      "driver",
      transaction,
    );
  }

  const driverData = await DriverService.updateDriver(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_DRIVER,
    {
      dataFromRequest: { ...req.body, id },
      result: driverData,
    },

    req,
  );

  return {
    data: driverData,
  };
};

module.exports.login = async (req) => {
  const { mobileNumber, password } = req.body;

  if (!mobileNumber && !password) {
    throw new ApplicationError("Логин и пароль не задан", {
      path: "controller",
    });
  }

  const driver = await DriverService.getDriverByMobileNumber(mobileNumber);

  if (!driver) {
    throw new ApplicationError("Телефон неверный", {
      path: "controller",
    });
  }

  const comparePass = await Encrypt.comparePassword(password, driver.password);

  if (!comparePass) {
    throw new ApplicationError("Пароль неверный", {
      path: "controller",
    });
  }

  // if (isBlocked(driver)) {
  //   throw new ApplicationError("Водитель заблокирован, {
  //     path: "controller",
  //   });
  // }

  return { data: driver };
};

module.exports.deactivate = async (req) => {
  let { mobileNumber, password } = req.query;

  mobileNumber = mobileNumber.replace("+7", "");

  if (!mobileNumber && !password) {
    throw new ApplicationError("Логин и пароль не задан", {
      path: "controller",
    });
  }

  const driver = await DriverService.getDriverByMobileNumber(mobileNumber);

  if (!driver) {
    throw new ApplicationError("Телефон неверный", {
      path: "controller",
    });
  }

  const comparePass = await Encrypt.comparePassword(password, driver.password);

  if (!comparePass) {
    throw new ApplicationError("Пароль неверный", {
      path: "controller",
    });
  }

  const driverData = await DriverService.updateDriver(
    {
      status: Statuses.PENDING,
    },
    { id: driver.id },
  );

  return {
    data: driverData,
  };
};

const validationDriverFilterFields = [query("mobileNumber").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "getDriverById": {
      return [param("id").isInt()];
    }

    case "getDriversWithParams": {
      return [
        ...validationDriverFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "createPendingDriver": {
      return [
        body("mobileNumber")
          // eslint-disable-next-line no-useless-escape
          .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
          .withMessage("Неправильный ввод телефона"),
      ];
    }

    case "create": {
      return [
        body("firstName").isString(),
        body("lastName").isString(),
        body("email").optional(),
        body("carBrand").isString(),
        body("carCapacity").isInt(),
        body("carNumber").isString(),
        body("carSTS").isString(),
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
        body("email").optional(),
        body("carBrand").isString().optional(),
        body("carCapacity").isInt().optional(),
        body("carNumber").isString().optional(),
        body("carSTS").isString().optional(),
        body("entityCategories").optional(), // в будущем переделать
        body("mobileNumber").isString().optional(), // .isMobilePhone("ru-RU")
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "login": {
      return [body("mobileNumber").isString(), body("password").isString()];
    }

    case "deactivate": {
      return [query("mobileNumber").isString(), query("password").isString()];
    }

    case "checkMobileNumber": {
      return [param("mobileNumber").isString()];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};
