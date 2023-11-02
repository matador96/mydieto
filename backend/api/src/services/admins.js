const Admins = require("../models/admins");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const admin = await Admins.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!admin)
    throw new ApplicationError("Администратор не найден", {
      path: "controllers",
    });

  return admin;
};

module.exports.getByField = async (field) => {
  const data = await Admins.findOne({
    where: { ...field },
  });
  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Admins.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "admin"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const admin = await Admins.create(obj, { ...settings }).then((resultEntity) => {
    const dataObj = resultEntity.get({ plain: true });
    return dataObj;
  });

  return admin;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Admins.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedAdmin = await Admins.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedAdmin;
};
