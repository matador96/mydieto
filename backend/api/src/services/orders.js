const Addresses = require("../models/addresses");
const Catalogs = require("../models/catalogs");
const Orders = require("../models/orders");
const OrderItems = require("../models/orderItems");
const OrderStatuses = require("../models/orderStatuses");
const Sellers = require("../models/sellers");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const order = await Orders.findByPk(id, {
    include: [
      Addresses,
      {
        model: OrderItems,
        include: Catalogs,
      },
      OrderItems,
      {
        model: OrderStatuses,
        as: "orderStatus",
      },
      Sellers,
    ],
    raw: false,
    nest: true,
  });

  if (!order)
    throw new ApplicationError("Заказ не найден", {
      path: "controllers",
    });

  return order;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Orders.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "order"),
    include: [
      Addresses,
      {
        model: OrderItems,
        include: Catalogs,
      },
      OrderItems,
      {
        model: OrderStatuses,
        as: "orderStatus",
        ...(queryParams.status !== undefined
          ? {
              where: {
                status: queryParams.status,
              },
            }
          : {}),
      },
      OrderStatuses,
      Sellers,
    ],
    order: [[OrderStatuses, "createdAt", "DESC"]],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const data = await Orders.create(obj, {
    include: [{ model: OrderItems, as: "orderItems" }],
    ...settings,
  });
  return data;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Orders.update(obj, {
    where: whereObj,
    include: [{ model: OrderItems, as: "orderItems" }],
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedOrder = await Orders.findOne({
    where: whereObj,
    include: [OrderItems, OrderStatuses],
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedOrder;
};
