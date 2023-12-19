const { body, param } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { statusesOfOrders } = require("../config/statusSettings");

const OrderService = require("../services/orders");
const UserService = require("../services/users");
const SellerService = require("../services/sellers");
const { ApplicationError } = require("../classes/Errors");
const OrderStatusesService = require("../services/ordersStatuses");
const Encrypt = require("../core/encrypt");
const Mailer = require("../core/mailer");

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
  const { status, statusComment } = orderData;

  const currentSessionUserId = req?.user?.profile?.id;
  const userData = await UserService.getUserById(currentSessionUserId); // избавиться от этого надо, теперь в req.user.profile все хранится

  if (orderItems) {
    orderItems = orderItems.map((e) => {
      if (typeof e !== "object") {
        return JSON.parse(e);
      }
      return e;
    });
    orderData.orderItems = orderItems;
  }

  orderData.sellerId = userData?.seller?.id;

  let order = await OrderService.create(orderData, { transaction });

  const orderStatusData = {
    comment: statusComment || "",
    orderId: order.id,
    userId: currentSessionUserId,
  };

  if (status) {
    orderStatusData.status = status;
  }

  const orderStatus = await OrderStatusesService.create(orderStatusData, {
    transaction,
  });

  order = await OrderService.update(
    { statusId: orderStatus.id },
    { id: order.id },
    { transaction },
  );

  return {
    order,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  let { ...orderData } = req.body;
  const { status, statusComment } = orderData;

  const currentSessionUserId = req?.user?.profile?.id;
  const userData = await UserService.getUserById(currentSessionUserId); // избавиться от этого надо, теперь в req.user.profile все хранится

  if (userData?.seller?.id) {
    const prevData = await OrderService.getById(id);
    if (prevData.sellerId !== userData?.seller?.id) {
      throw new ApplicationError("Вы не можете изменить чужой заказ", {
        path: "controller",
      });
    }
  }

  if (status) {
    const orderStatusData = {
      status,
      comment: statusComment || "",
      orderId: id,
      userId: currentSessionUserId,
    };

    const orderStatus = await OrderStatusesService.create(orderStatusData, {
      transaction,
    });

    orderData.statusId = orderStatus.id;
  }

  const data = await OrderService.update(orderData, { id }, { transaction });

  return {
    data,
  };
};

module.exports.sendCode = async (req) => {
  const { id } = req.params;
  const order = await OrderService.getById(id);
  const seller = await SellerService.getById(order.sellerId);
  const { user } = seller;
  const { email } = user;

  const code =
    (order.id % 100).toString().padStart(2, "0") +
    (seller.id % 100).toString().padStart(2, "0");

  if (email) {
    await Mailer.sendConfirmation(email, {
      code,
    });
  }
  return {
    data: { code },
  };
};

module.exports.checkCode = async (req) => {
  const { id, code } = req.params;

  const order = await OrderService.getById(id);
  const seller = await SellerService.getById(order.sellerId);

  const checkCode =
    (order.id % 100).toString().padStart(2, "0") +
    (seller.id % 100).toString().padStart(2, "0");

  if (code !== checkCode) {
    throw new ApplicationError("Код неверный", {
      path: "controller",
    });
  }

  return {
    data: { code },
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
        body("orderItems").isArray().optional(),
        body("status").isIn(statusesOfOrders).optional(),
      ];
    }

    default:
      break;
  }
};
