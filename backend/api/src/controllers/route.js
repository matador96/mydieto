const { body, param, query } = require("express-validator");

const DriverService = require("../services/drivers");
const LeadService = require("../services/leads");
const RatingService = require("../services/ratings");
const RouteService = require("../services/routes");

const Validations = require("../const/validatorSettings");
const Statuses = require("../enums/statuses");
const { statusesOfRoutes } = require("../config/statusSettings");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");
const { routeStatusStrategyManager } = require("../classes/RouteStatusStrategy");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getRouteById = async (req) => {
  const { id } = req.params;
  const route = await RouteService.getRouteById(id);

  return { data: route };
};

module.exports.getRoutesWithParams = async (req) => {
  if (req.query.driverId === "") {
    req.query.driverId = null;
  }

  let isRequiredLeads = false;

  if (req.isApiKeyValid) {
    // на телефон отправляем только маршруты с лидами
    isRequiredLeads = true;
  }

  const result = await RouteService.getRoutesWithParams(req.query, {
    isRequiredLeads,
  });

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const routeData = {
    ...req.body,
  };

  const result = await RouteService.createRoute(routeData, { transaction });

  const { leadIds } = req.body;

  if (leadIds) {
    await LeadService.updateRouteIdOfLeads(leadIds, result.id, Statuses.ACTIVE, {
      transaction,
    });
  }

  userLogger(
    loggerActions.CREATE_ROUTE,
    {
      dataFromRequest: routeData,
      result: result,
    },
    req,
  );

  return {
    data: result,
  };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  const result = await LeadService.getLeadsWithParams({
    routeId: id,
  });

  if (result.count > 0) {
    throw new ApplicationError(
      "Невозможно удалить, так как у маршрута есть заявки, уберите их",
      {
        path: "controller",
      },
    );
  }

  await RouteService.deleteRoute({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_ROUTE,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const prevData = await RouteService.getRouteById(id);

  const routeStatusesCantBeSaveWithoutDriverId = [
    Statuses.INWORK,
    Statuses.FINISHED,
  ];

  let isHaveDriverId = !!req.body.driverId || !!prevData.driverId;

  if (
    !isHaveDriverId &&
    routeStatusesCantBeSaveWithoutDriverId.includes(req.body.status)
  ) {
    throw new ApplicationError("Статус не изменился, водитель был не указан", {
      path: "controller",
    });
  }

  const { leadIds, driverId } = req.body;

  let choosedStatus = req.body.status;

  if (
    prevData.status === Statuses.FINISHED &&
    choosedStatus &&
    choosedStatus !== Statuses.FINISHED
  ) {
    // delete rating
    await RatingService.deleteRating(
      {
        actionForEntityType: "route",
        actionForEntityId: id,
      },
      { transaction },
    );
  }

  if (leadIds) {
    let actaulStatus = req.body.status || prevData.status;
    await LeadService.updateRouteIdOfLeads(leadIds, id, actaulStatus, {
      transaction,
    });
  }

  let data = {};

  const statusesCanBeDoOnCurrent = {
    [Statuses.ACTIVE]: [Statuses.INWORK, Statuses.BLOCKED],
    [Statuses.INWORK]: [Statuses.ACTIVE, Statuses.FINISHED],
    [Statuses.FINISHED]: [Statuses.INWORK],
    [Statuses.BLOCKED]: [Statuses.ACTIVE],
  };

  const choosedDriver = driverId || prevData?.driverId;

  if (driverId) {
    const driverData = await DriverService.getDriverById(choosedDriver);
    if (driverData.isHaveInWorkRoute) {
      throw new ApplicationError("Этот водитель уже назначен на другой маршрут", {
        path: "controller",
      });
    }
  }

  if (choosedStatus) {
    const currentStatus = prevData.status;
    const changeTo = choosedStatus;

    if (!statusesCanBeDoOnCurrent[currentStatus].includes(changeTo)) {
      throw new ApplicationError("Нельзя перепрыгивать через статус", {
        path: "controller",
      });
    }

    const statusStrategy = routeStatusStrategyManager.getStrategy(choosedStatus);

    data = await statusStrategy.do(id, choosedDriver, transaction);
  }

  delete req.body.status;
  data = await RouteService.update({ ...req.body }, { id }, { transaction });

  userLogger(
    loggerActions.UPDATE_ROUTE,
    {
      dataFromRequest: { ...req.body, id },
      result: data,
    },
    req,
  );

  return {
    data: data,
  };
};

const validationRouteFilterFields = [query("id").isString().optional()];

module.exports.validate = (method) => {
  switch (method) {
    case "getRouteById": {
      return [param("id").isInt()];
    }

    case "getRoutesWithParams": {
      return [
        ...validationRouteFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("status").isIn(statusesOfRoutes).optional(),
        body("driverId").optional(),
        body("suggestedBuyPrice").optional(),
        body("commission").optional(),
        body("leadIds").optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("status").isIn(statusesOfRoutes).optional(),
        body("suggestedBuyPrice").optional(),
        body("commission").optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};
