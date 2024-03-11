const { Users, Admins, Instructors, Clients } = require("../models/users");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Users.count();
  return data;
};

module.exports.getActiveCount = async () => {
  const data = await Users.count({
    where: {
      status: {
        $notIn: ["blocked"],
      },
    },
  });
  return data;
};

module.exports.getUserById = async (id) => {
  const user = await Users.findByPk(id, {
    raw: true,
    nest: true,
    distinct: true,
  });

  if (!user)
    throw new ApplicationError("Данные не верны", {
      path: "controllers",
    });

  return user;
};

module.exports.getByEmail = async (email) => {
  const data = await Users.findOne({
    where: { email: email },
    raw: true,
    nest: true,
    distinct: true,
  });
  return data;
};

module.exports.getUsersWithParams = async (queryParams) => {
  const data = await Users.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "user"),
    include: [Admins, Instructors, Clients],
    raw: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createUser = async (obj, settings = {}) => {
  const user = await Users.create(obj, {
    ...settings,
    raw: true,
  }).then((data) => data.get({ plain: true }));

  return user;
};

module.exports.deleteUser = async (whereObj) => {
  return await Users.destroy({ where: whereObj });
};

module.exports.updateUser = async (obj, whereObj) => {
  await Users.update(obj, {
    where: whereObj,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedUser = await Users.findOne({
    where: whereObj,
    //...settings,
  });

  return updatedUser;
};
