const { body, param } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { statusesOfOrders } = require("../config/statusSettings");

const OrderService = require("../services/orders");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const data = await OrderService.getById(id);

  return { data };
};

module.exports.getWithParams = async (req) => {
  const result = await OrderService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  let { orderItems, ...orderData } = req.body;

  if (orderItems) {
    orderItems = orderItems.map((e) => JSON.parse(e));
    orderData.orderItems = orderItems;
  }

  const data = await OrderService.create(orderData, { transaction });

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  let { ...orderData } = req.body;

  const data = await OrderService.update(orderData, { id }, { transaction });

  return {
    data,
  };
};

const validationOrderFilterFields = [];

module.exports.validate = (method) => {
  switch (method) {
    case "getById": {
      return [param("id").isInt()];
    }

    case "getWithParams": {
      return [
        ...validationOrderFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("sellerId").isInt(),
        body("addressId").isInt(),
        body("price").isInt().optional(),
        body("facticalPrice").isInt().optional(),
        body("orderItems").isArray().optional(),
        body("status").isIn(statusesOfOrders).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("sellerId").isInt().optional(),
        body("addressId").isInt().optional(),
        body("price").isInt().optional(),
        body("facticalPrice").isInt().optional(),
        body("orderItems").isArray().optional(),
        body("status").isIn(statusesOfOrders).optional(),
      ];
    }

    default:
      break;
  }
};
