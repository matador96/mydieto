const Catalogs = require("../models/catalogs");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const catalog = await Catalogs.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!catalog)
    throw new ApplicationError("Каталог не найден", {
      path: "controllers",
    });

  return catalog;
};

module.exports.getByField = async (field) => {
  const data = await Catalogs.findOne({
    where: { ...field },
  });
  return data;
};

module.exports.getWithParamsByParentId = async (queryParams) => {
  const data = await Catalogs.findAndCountAll({
    ...generateDatabaseSetting({ ...queryParams }, "catalog"),
  });

  return { data: data.rows, count: data.count };
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Catalogs.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "catalog"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const catalog = await Catalogs.create(obj, { ...settings }).then(
    (resultEntity) => {
      const dataObj = resultEntity.get({ plain: true });
      return dataObj;
    },
  );

  return catalog;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Catalogs.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedCatalog = await Catalogs.findOne({
    where: whereObj,
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedCatalog;
};
