const StatsService = require("../services/stats");

module.exports.getModelsCounts = async (req) => {
  const { serviceName } = req.params;
  const service = await StatsService.getServiceByName(serviceName);
  const count = await service.getCount();
  return { data: count };
};

module.exports.getProgression = async () => {
  const data = await StatsService.getEntitiesGroupedByDate();
  return { data: data };
};

module.exports.getNumberOfFreeCars = async () => {
  const data = await StatsService.getNumberOfFreeCars();
  return { data: data };
};

module.exports.getNumberOfWorkCars = async () => {
  const data = await StatsService.getNumberOfWorkCars();
  return { data: data };
};

module.exports.getLeadsCapacities = async (req) => {
  const { date } = req.query;
  const data = await StatsService.getLeadsCapacities(date);
  return { data: data };
};

module.exports.getRoutesCommissions = async (req) => {
  const { date } = req.query;
  const data = await StatsService.getRoutesCommissions(date);
  return { data: data };
};
