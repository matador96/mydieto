const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { statusesOfOrderItems } = require("../config/statusSettings");

const OrderItemService = require("../services/orderItems");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const data = await OrderItemService.getById(id);

  return { data };
};

module.exports.getWithParams = async (req) => {
  const result = await OrderItemService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const { ...orderItemData } = req.body;
  const data = await OrderItemService.create(orderItemData, { transaction });

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  let { ...orderItemData } = req.body;

  const data = await OrderItemService.update(orderItemData, { id }, { transaction });

  return {
    data,
  };
};

const validationOrderItemFilterFields = [];

module.exports.validate = (method) => {
  switch (method) {
    case "getById": {
      return [param("id").isInt()];
    }

    case "getWithParams": {
      return [
        ...validationOrderItemFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("catalogId").isInt(),
        body("orderId").isInt(),
        body("quantity").isInt().optional(),
        body("status").isIn(statusesOfOrderItems).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("catalogId").isInt().optional(),
        body("orderId").isInt().optional(),
        body("quantity").isInt().optional(),
        body("status").isIn(statusesOfOrderItems).optional(),
      ];
    }

    default:
      break;
  }
};
