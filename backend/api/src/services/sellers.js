const Sellers = require("../models/sellers");
const Categories = require("../models/categories");
const { generateDatabaseSetting } = require("../helpers/db");
const Addresses = require("./../models/addresses");
const EntityCategories = require("./../models/entityCategories");
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

module.exports.getSellerById = async (id) => {
  const seller = await Sellers.findByPk(id, {
    include: [
      {
        model: Addresses,
        where: { entityName: "seller" },
        required: false,
      },
      {
        model: EntityCategories,
        where: { entityName: "seller" },
        required: false,
        include: Categories,
      },
    ],
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

module.exports.getByMobileNumber = async (mobile) => {
  try {
    const data = await Sellers.findOne({
      where: { mobileNumber: mobile },
    });
    return data;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.getSellersWithParams = async (queryParams) => {
  const data = await Sellers.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "seller"),
    include: [
      {
        model: Addresses,
        separate: true,
        where: { entityName: "seller" },
        required: false,
      },
      {
        separate: true,
        model: EntityCategories,
        where: { entityName: "seller" },
        include: Categories,
      },
    ],
    raw: false,
    nest: true,
    distriction: true,
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
