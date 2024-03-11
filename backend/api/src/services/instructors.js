const { Users, Admins, Instructors, Clients } = require("../models/users");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Instructors.count();
  return data;
};

module.exports.getById = async (id) => {
  const user = await Instructors.findByPk(id, {
    include: [Users],
    raw: false,
    nest: true,
  });

  if (!user)
    throw new ApplicationError("Данные не верны", {
      path: "controllers",
    });

  return user;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Instructors.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "user"),
    raw: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const user = await Instructors.create(obj, {
    ...settings,
    raw: true,
  }).then((data) => data.get({ plain: true }));

  return user;
};

module.exports.update = async (obj, whereObj) => {
  await Instructors.update(obj, {
    where: whereObj,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  return await Instructors.findOne({
    where: whereObj,
    //...settings,
  });
};
