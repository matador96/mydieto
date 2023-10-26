const StatsController = require("../controllers/stats");

module.exports = [
  {
    type: "get",
    url: "/api/v1/stats/count/:serviceName",
    middlewares: [],
    method: StatsController.getModelsCounts,
  },
  {
    type: "get",
    url: "/api/v1/stats/progression",
    middlewares: [],
    method: StatsController.getProgression,
  },
  {
    type: "get",
    url: "/api/v1/stats/cars/free",
    middlewares: [],
    method: StatsController.getNumberOfFreeCars,
  },
  {
    type: "get",
    url: "/api/v1/stats/cars/work",
    middlewares: [],
    method: StatsController.getNumberOfWorkCars,
  },
  {
    type: "get",
    url: "/api/v1/stats/leads/capacities",
    middlewares: [],
    method: StatsController.getLeadsCapacities,
  },
  {
    type: "get",
    url: "/api/v1/stats/routes/commissions",
    middlewares: [],
    method: StatsController.getRoutesCommissions,
  },
];
