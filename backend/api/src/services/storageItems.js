const StorageItems = require("../models/storageItems");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const storageItem = await StorageItems.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!storageItem)
    throw new ApplicationError("Вещь со склада не найдена", {
      path: "controllers",
    });

  return storageItem;
};

module.exports.getByField = async (field) => {
  const data = await StorageItems.findOne({
    where: { ...field },
  });
  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await StorageItems.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "storageItem"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const storageItem = await StorageItems.create(obj, { ...settings }).then(
    (resultEntity) => {
      const dataObj = resultEntity.get({ plain: true });
      return dataObj;
    },
  );

  return storageItem;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await StorageItems.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedCatalog = await StorageItems.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedCatalog;
};

module.exports.delete = async (whereObj, settings = {}) => {
  return await StorageItems.destroy({ where: whereObj, ...settings });
};