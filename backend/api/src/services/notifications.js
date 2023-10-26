const Notifications = require("../models/notifications");
const { generateDatabaseSetting } = require("../helpers/db");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

module.exports.getNotificationsWithParams = async (queryParams) => {
  const data = await Notifications.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "notification"),
    separate: true,
    raw: false,
    distinct: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.getNewNotificationsCountWithParams = async (id = 5) => {
  const data = await Notifications.findAndCountAll({
    where: {
      id: {
        [Op.gt]: id,
      },
    },

    order: [["id", "DESC"]],
    separate: true,
    raw: false,
    distinct: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createNotification = async (obj, settings = {}) => {
  return await Notifications.create(obj, { ...settings }).then((data) => data);
};

module.exports.updateNotification = async (obj, whereObj) => {
  await Notifications.update(obj, {
    where: whereObj,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedNotification = await Notifications.findOne({
    where: whereObj,
    //...settings,
  });

  return updatedNotification;
};
