const Addresses = require("../models/addresses");
const Users = require("../models/users");
const Sellers = require("../models/sellers");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");
const sequelize = require("../core/db");

module.exports.getCount = async () => {
  const data = await Sellers.count();
  return data;
};

module.exports.getActiveCount = async () => {
  const data = await Sellers.count({
    where: {
      status: {
        $notIn: ["archive"],
      },
    },
  });
  return data;
};

module.exports.deleteSeller = async (whereObj, settings = {}) => {
  return await Sellers.destroy({ where: whereObj, ...settings });
};

module.exports.getById = async (id) => {
  const seller = await Sellers.findByPk(id, {
    include: [Users],
    raw: false,
    nest: true,
  });

  if (!seller)
    throw new ApplicationError("Продавец не найден", {
      path: "controllers",
    });

  return seller;
};

module.exports.getGroupedByDate = async () => {
  const data = await Sellers.findAll({
    attributes: [
      [sequelize.cast(sequelize.col("createdAt"), "date"), "date"],
      [sequelize.fn("COUNT", sequelize.col("*")), "count"],
    ],
    where: {
      createdAt: {
        $gte: sequelize.literal("now() - interval '30 days'"),
      },
    },
    // order: [["createdAt", "DESC"]],
    group: "date",
  });

  return data;
};

module.exports.getByField = async (field) => {
  const data = await Sellers.findOne({
    // include: [Addresses],
    where: { ...field },
  });
  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Sellers.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "seller"),
    include: [Addresses],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const seller = await Sellers.create(obj, { ...settings }).then((resultEntity) => {
    const dataObj = resultEntity.get({ plain: true });
    return dataObj;
  });

  return seller;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Sellers.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedSeller = await Sellers.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedSeller;
};
