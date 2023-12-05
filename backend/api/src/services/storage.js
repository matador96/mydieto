const Storage = require("../models/storage");
const Catalog = require("../models/catalogs");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const storage = await Storage.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!storage)
    throw new ApplicationError("Вещь со склада не найдена", {
      path: "controllers",
    });

  return storage;
};

module.exports.getByFields = async (fields) => {
  const data = await Storage.findOne({
    where: { ...fields },
  });
  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Storage.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "storage"),
    include: [Catalog],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const storage = await Storage.create(obj, { ...settings }).then((resultEntity) => {
    const dataObj = resultEntity.get({ plain: true });
    return dataObj;
  });

  return storage;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Storage.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedCatalog = await Storage.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedCatalog;
};

module.exports.delete = async (whereObj, settings = {}) => {
  return await Storage.destroy({ where: whereObj, ...settings });
};
