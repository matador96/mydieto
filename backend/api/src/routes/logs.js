const LogsController = require("../controllers/logs");

module.exports = [
  {
    type: "get",
    url: "/api/v1/log",
    middlewares: [],
    method: LogsController.getUserLogByDate,
  },
  {
    type: "get",
    url: "/api/v1/log/dates",
    middlewares: [],
    method: LogsController.getUserLogDates,
  },
  {
    type: "get",
    url: "/api/v1/errorlog",
    middlewares: [],
    method: LogsController.getErrorLogByDate,
  },
  {
    type: "get",
    url: "/api/v1/errorlog/dates",
    middlewares: [],
    method: LogsController.getErrorLogDates,
  },
];
