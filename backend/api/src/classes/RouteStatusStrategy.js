const DriverService = require("../services/drivers");
const LeadService = require("../services/leads");
const NotificationService = require("../services/notifications");
const RouteService = require("../services/routes");

const Statuses = require("../enums/statuses");
const { notifications } = require("../enums/notifications");

class RouteStatusStrategyManager {
  constructor() {
    this._strategies = [];
  }

  addStrategy(strategy) {
    this._strategies = [...this._strategies, strategy];
  }

  getStrategy(name) {
    return this._strategies.find((strategy) => strategy._name === name);
  }
}

class RouteStatusStrategy {
  constructor(name, handler) {
    this._name = name;
    this._handler = handler;
  }

  async do(...args) {
    await this._handler(...args);
  }
}

const routeStatusStrategyManager = new RouteStatusStrategyManager();

const blockedStatusRoute = new RouteStatusStrategy(
  Statuses.BLOCKED,
  async (routeId) => {
    return await RouteService.update({ status: Statuses.BLOCKED }, { id: routeId }); // ставится статус блокед
  },
);

const activeStatusRoute = new RouteStatusStrategy(
  Statuses.ACTIVE,
  async (routeId, driverId, transaction) => {
    await LeadService.updateLeadStatusesByRouteId(routeId, Statuses.ACTIVE, {
      transaction,
    });
    return await RouteService.update(
      { status: Statuses.ACTIVE, driverId: null },
      { id: routeId },
      { transaction },
    ); // ставится статус актив, водитель убирается
  },
);

const inworkStatusRoute = new RouteStatusStrategy(
  Statuses.INWORK,
  async (routeId, driverId, transaction) => {
    await LeadService.updateLeadStatusesByRouteId(routeId, Statuses.INWORK, {
      transaction,
    }); // У всех заявок ставится в работе
    const driver = await DriverService.updateDriver(
      { status: Statuses.INWORK },
      { id: driverId },
      { transaction },
    ); // Водитель становится в работе
    const route = await RouteService.update(
      { status: Statuses.INWORK, driverId: driverId },
      { id: routeId },
      { transaction },
    ); // ставится статус в работе, водитель добавляется

    await NotificationService.createNotification(
      {
        ...notifications.DRIVER_TAKE_ROUTE,
        title: `Маршрут №${route.id} изменён`,
        description: `Водитель (${driver.mobileNumber}) взял маршрут №${route.id}`,
        entityId: route.id,
      },
      { transaction },
    );
    return route;
  },
);

const finishedStatusRoute = new RouteStatusStrategy(
  Statuses.FINISHED,
  async (routeId, driverId, transaction) => {
    await LeadService.updateLeadStatusesByRouteId(routeId, Statuses.FINISHED, {
      transaction,
    }); // У всех заявок ставится в завершенный

    const route = await RouteService.update(
      { status: Statuses.FINISHED },
      { id: routeId },
      { transaction },
    ); // ставится статус в завершенный

    const driver = await DriverService.getDriverById(route.driverId); // Водитель становится в работе

    await NotificationService.createNotification(
      {
        ...notifications.DRIVER_FINISH_ROUTE,
        title: `Маршрут №${route.id} изменён`,
        description: `Водитель (${driver.mobileNumber}) завершил маршрут №${route.id}`,
        entityId: route.id,
      },
      { transaction },
    );
    return route;
  },
);

routeStatusStrategyManager.addStrategy(blockedStatusRoute);
routeStatusStrategyManager.addStrategy(activeStatusRoute);
routeStatusStrategyManager.addStrategy(inworkStatusRoute);
routeStatusStrategyManager.addStrategy(finishedStatusRoute);

module.exports = { routeStatusStrategyManager };
