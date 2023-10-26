const CategoryService = require("./categories");
const DriverService = require("./drivers");
const LeadService = require("./leads");
const RouteService = require("./routes");
const SellerService = require("./sellers");
const UserService = require("./users");
const { ApplicationError } = require("./../classes/Errors");

const { DateTime } = require("luxon");

const getServiceByName = (serviceName) => {
  const servicesWithMethods = {
    category: CategoryService,
    driver: DriverService,
    lead: LeadService,
    route: RouteService,
    seller: SellerService,
    user: UserService,
  };

  if (!servicesWithMethods[serviceName])
    throw new ApplicationError("Такого сервиса нет", {
      path: "controllers",
    });

  return servicesWithMethods[serviceName];
};

const getEntitiesGroupedByDate = async () => {
  const serviceNames = ["driver", "lead", "route", "seller"];
  const result = {};

  for (const name of serviceNames) {
    const service = getServiceByName(name);
    const data = await service.getGroupedByDate();
    for (let entity of data) {
      if (!result[entity.date]) {
        result[entity.date] = {};
      }
      result[entity.date][name] = parseInt(entity.count);
    }
  }

  let normalizedArr = [];

  for (let key in result) {
    let date = key;
    let fields = result[key];

    normalizedArr.push({ date, ...fields });
  }

  let driversCount = await DriverService.getActiveCount();
  let sellersCount = await SellerService.getActiveCount();
  let leadsCount = await LeadService.getActiveCount();
  let routesCount = await RouteService.getActiveCount();

  normalizedArr = normalizedArr.sort((a, b) => new Date(a.date) - new Date(b.date));

  normalizedArr.reverse();

  let normalizedResult = normalizedArr.map((e) => {
    let obj = {
      ...e,
      driver: driversCount,
      seller: sellersCount,
      lead: leadsCount,
      route: routesCount,
    };

    driversCount = driversCount - (e?.driver || 0);
    sellersCount = sellersCount - (e?.seller || 0);
    leadsCount = leadsCount - (e?.lead || 0);
    routesCount = routesCount - (e?.route || 0);

    return obj;
  });

  return normalizedResult;
};

const getNumberOfFreeCars = async () => {
  const amount = DriverService.getAmountOfDriversByStatus("active");
  return amount;
};

const getNumberOfWorkCars = async () => {
  const amount = DriverService.getAmountOfDriversByStatus("inwork");
  return amount;
};

const getLeadsCapacities = async (date = "") => {
  let result;
  if (!date) {
    result = await LeadService.getFinishedLeadsCapacities();
  } else {
    result = await LeadService.getFinishedLeadsCapacitiesByDate(
      DateTime.fromFormat(date, "yyyy-MM-dd"),
    );
  }

  if (!result) {
    result = 0;
  }

  return result;
};

const getRoutesCommissions = async (date = "") => {
  let result;
  if (!date) {
    result = await RouteService.getFinishedRoutesCommissions();
  } else {
    result = await LeadService.getFinishedLeadsCapacitiesByDate(
      DateTime.fromFormat(date, "yyyy-MM-dd"),
    );
  }

  if (!result) {
    result = 0;
  }

  return result;
};

module.exports = {
  getServiceByName,
  getEntitiesGroupedByDate,
  getNumberOfFreeCars,
  getNumberOfWorkCars,
  getLeadsCapacities,
  getRoutesCommissions,
};
