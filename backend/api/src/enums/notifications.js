const notificationTypes = {
  IS_PENDING: "isPending",
  FINISH_LEAD: "finishLead",
  FINISH_ROUTE: "finishRoute",
  TAKE_ROUTE: "takeRoute",
};

const notificationEntity = {
  DRIVER: "driver",
  LEAD: "lead",
  ROUTE: "route",
};

const notifications = {
  DRIVER_IS_PENDING: {
    type: notificationTypes.IS_PENDING,
    entityName: notificationEntity.DRIVER,
  },

  DRIVER_FINISH_LEAD: {
    type: notificationTypes.FINISH_LEAD,
    entityName: notificationEntity.LEAD,
  },

  DRIVER_TAKE_ROUTE: {
    type: notificationTypes.TAKE_ROUTE,
    entityName: notificationEntity.ROUTE,
  },
  DRIVER_FINISH_ROUTE: {
    type: notificationTypes.FINISH_ROUTE,
    entityName: notificationEntity.ROUTE,
  },
};

module.exports = {
  notifications,
};
