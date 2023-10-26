const LogsService = require("../services/logs");
const { getToday } = require("../helpers/log");

module.exports.getUserLogByDate = async (req) => {
  let { date } = req.query;
  if (!date) {
    date = getToday();
  }

  const logs = await LogsService.getLogByDate(date, "userLogging");

  return logs;
};

module.exports.getErrorLogByDate = async (req) => {
  let { date } = req.query;
  if (!date) {
    date = getToday();
  }

  const logs = await LogsService.getLogByDate(date, "errorLogging");

  return logs;
};

module.exports.getUserLogDates = async () => {
  const existedDates = await LogsService.getDates("userLogging");

  return { data: existedDates };
};

module.exports.getErrorLogDates = async () => {
  const existedDates = await LogsService.getDates("errorLogging");

  return { data: existedDates };
};
