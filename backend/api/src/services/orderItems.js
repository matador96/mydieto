const OrderItems = require("../models/orderItems");
const Catalogs = require("../models/catalogs");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const orderItem = await OrderItems.findByPk(id, {
    include: [Catalogs],
    raw: false,
    nest: true,
  });

  if (!orderItem)
    throw new ApplicationError("Предмет заказа не найден", {
      path: "controllers",
    });

  return orderItem;
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
    include: [OrderItems],
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedOrderItem;
};
