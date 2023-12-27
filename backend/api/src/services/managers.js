const Managers = require("../models/managers");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const manager = await Managers.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!manager)
    throw new ApplicationError("Менеджер не найден", {
      path: "controllers",
    });

  return manager;
};

module.exports.getByFields = async (fields) => {
  const data = await Managers.findOne({
    where: { ...fields },
  });
  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Managers.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "manager"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const manager = await Managers.create(obj, { ...settings }).then(
    (resultEntity) => {
      const dataObj = resultEntity.get({ plain: true });
      return dataObj;
    },
  );

  return manager;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Managers.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedManager = await Managers.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedManager;
};
