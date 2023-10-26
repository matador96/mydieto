const winston = require("winston");
const { allActions } = require("./../const/userLoggerActions");
require("winston-daily-rotate-file");

const userLogInterface = (obj) => {
  const { action, extra, user } = obj;
  const currentActionInfo = allActions[action];

  return {
    ...obj,
    title: currentActionInfo.title,
    description: currentActionInfo.message.success.description(user, extra),
    message: obj.message,
    level: obj.level,
    timestamp: obj.timestamp,
  };
};

const transport = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  dirname: "logs",
  maxFiles: "10",
});

const transportError = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  dirname: "error-logs",
  maxFiles: "10",
});

transport.on("rotate", function () {
  // do something fun
});

const { format } = winston;

const userLogger = (action, extra, req) => {
  let user = req?.user?.profile;
  if (req?.isApiKeyValid) {
    user = {
      id: -1,
      login: "API any service",
      roleId: 0,
      status: "active",
      firstName: "API another service",
      lastName: "",
    };
  }
  return winston
    .createLogger({
      level: "debug",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf((info) => {
          return JSON.stringify(userLogInterface({ ...info, action, extra, user }));
        }),
      ),
      transports: [
        // new winston.transports.Console({
        //   level: "debug",
        //   handleExceptions: true,
        //   json: false,
        //   colorize: true,
        //   timestamp: true,
        // }),
        transport,
      ],
    })
    .info("info");
};

const errorLogger = (errObj) => {
  return winston
    .createLogger({
      level: "debug",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf((info) => {
          return JSON.stringify({ ...info, ...errObj });
        }),
      ),
      transports: [
        // new winston.transports.Console({
        //   level: "error",
        //   handleExceptions: true,
        //   json: false,
        //   colorize: true,
        //   timestamp: true,
        // }),
        transportError,
      ],
    })
    .info("info");
};

// const dynamicLogLevel = (req, res) => {
//   if (res) {
//     const { errors } = res.body;
//     if (errors) {
//       return "error";
//     }
//   }
//   return "debug";
// };

module.exports = {
  userLogger,
  errorLogger,
};
