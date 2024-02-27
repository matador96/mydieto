const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { statusesOfOrderItems } = require("../config/statusSettings");

const OrderService = require("../services/orders");
const OrderItemService = require("../services/orderItems");
const StorageService = require("../services/storage");

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

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  const orderItem = await OrderItemService.getById(id);
  const order = await OrderService.getById(orderItem.orderId);

  const sellerId = order.sellerId;
  const articleId = orderItem.articleId;

  const storageItem = await StorageService.getByFields({
    sellerId,
    articleId,
  });

  if (storageItem) {
    storageItem.quantity += orderItem.quantity;
    await StorageService.update(
      storageItem,
      { id: storageItem.id },
      { transaction },
    );
  }

  await OrderItemService.delete({ id }, { transaction });

  return {};
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
        body("articleId").isInt(),
        body("orderId").isInt(),
        body("quantity").isInt().optional(),
        body("status").isIn(statusesOfOrderItems).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("articleId").isInt().optional(),
        body("orderId").isInt().optional(),
        body("quantity").isInt().optional(),
        body("status").isIn(statusesOfOrderItems).optional(),
      ];
    }

    default:
      break;
  }
};
