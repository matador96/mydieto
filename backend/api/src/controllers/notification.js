const NotificationService = require("../services/notifications");
const Validations = require("../const/validatorSettings");

module.exports.getNotificationsWithParams = async (req) => {
  const result = await NotificationService.getNotificationsWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getNewNotificationsCountWithParams = async (req) => {
  const result = await NotificationService.getNewNotificationsCountWithParams(
    req.query.id,
  );
  return { data: result.data, count: result.count };
};

module.exports.validate = (method) => {
  switch (method) {
    case "getNotificationsWithParams": {
      return [...Validations.pagination, ...Validations.sorting];
    }

    default:
      break;
  }
};
