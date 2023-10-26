const NotificationController = require("../controllers/notification");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/notifications",
    middlewares: [
      authenticate,
      NotificationController.validate("getNotificationsWithParams"),
      validationChecker,
    ],
    method: NotificationController.getNotificationsWithParams,
  },
  {
    type: "get",
    url: "/api/v1/notifications/count",
    middlewares: [authenticate],
    method: NotificationController.getNewNotificationsCountWithParams,
  },
];
