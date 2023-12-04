const OrderStatuses = require("../models/orderStatuses");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const orderStatus = await OrderStatuses.findByPk(id, {
    raw: false,
    nest: true,
  });

  if (!orderStatus)
    throw new ApplicationError("Статус заказа не найден", {
      path: "controllers",
    });

  return orderStatus;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await OrderStatuses.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "orderStatus"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const data = await OrderStatuses.create(obj, {
    ...settings,
  });
  return data;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await OrderStatuses.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedOrderStatus = await OrderStatuses.findOne({
    where: whereObj,
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedOrderStatus;
};
