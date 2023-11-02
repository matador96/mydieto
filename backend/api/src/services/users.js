const Users = require("../models/users");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

const public_fields = [
  "id",
  "email",
];

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
  const user = await Users.findByPk(id);

  if (!user)
    throw new ApplicationError("Данные не верны", {
      path: "controllers",
    });

  return user;
};

module.exports.getByEmail = async (email) => {

  const data = await Users.findOne({
    where: { email: email },
  });
  return data;
};

module.exports.getUsersWithParams = async (queryParams) => {
  const data = await Users.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "user"),
    attributes: public_fields,
    }
  );

  return { data: data.rows, count: data.count };
};

module.exports.createUser = async (obj) => {
  const user = await Users.create(obj, {
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
    attributes: public_fields,
  });

  return updatedUser;
};
