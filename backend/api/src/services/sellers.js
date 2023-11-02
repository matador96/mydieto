const Sellers = require("../models/sellers");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");
const sequelize = require("../core/db");
const AddressesService = require("./addresses");
const EntityCategoriesService = require("./entityCategories");

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
  await EntityCategoriesService.deleteWithParams(
    {
      entityName: "seller",
      entityId: whereObj.id,
    },
    settings,
  );

  await AddressesService.deleteWithParams(
    {
      entityName: "seller",
      entityId: whereObj.id,
    },
    settings,
  );

  return await Sellers.destroy({ where: whereObj, ...settings });
};

module.exports.getById = async (id) => {
  const seller = await Sellers.findByPk(id, {
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
    where: { ...field },
  });
  return data;
};

module.exports.getSellersWithParams = async (queryParams) => {
  const data = await Sellers.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "seller"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createSeller = async (obj, settings = {}) => {
  const seller = await Sellers.create(obj, { ...settings }).then((resultEntity) => {
    const dataObj = resultEntity.get({ plain: true });
    return dataObj;
  });

  return seller;
};

module.exports.updateSeller = async (obj, whereObj, settings = {}) => {
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
