const OrderItems = require("../models/orderItems");
const Articles = require("../models/articles");
const { ApplicationError } = require("./../classes/Errors");
const { generateDatabaseSetting } = require("../helpers/db");

module.exports.getById = async (id) => {
  const orderItem = await OrderItems.findByPk(id, {
    include: [Articles],
    raw: false,
    nest: true,
  });

  if (!orderItem)
    throw new ApplicationError("Предмет заказа не найден", {
      path: "controllers",
    });

  return orderItem;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await OrderItems.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "orderItem"),
    include: [Articles],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const data = await OrderItems.create(obj, {
    ...settings,
  });
  return data;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await OrderItems.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedOrderItem = await OrderItems.findOne({
    where: whereObj,
    include: [Articles],
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedOrderItem;
};

module.exports.delete = async (whereObj, settings = {}) => {
  return await OrderItems.destroy({ where: whereObj, ...settings });
};
