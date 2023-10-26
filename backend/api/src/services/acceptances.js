const Acceptances = require("../models/acceptances");
const Addresses = require("../models/addresses");
const Drivers = require("../models/drivers");
const EntityCategories = require("./../models/entityCategories");
const Categories = require("../models/categories");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");
const EntityCategoriesService = require("./entityCategories");
const AuctionsService = require("./auctions");
const AddressesService = require("./addresses");

module.exports.getCount = async () => {
  const data = await Acceptances.count();
  return data;
};

module.exports.deleteAcceptance = async (whereObj, settings = {}) => {
  await EntityCategoriesService.deleteWithParams(
    {
      entityName: "acceptance",
      entityId: whereObj.id,
    },
    settings,
  );

  await AuctionsService.deleteAuctionPrices(
    {
      acceptanceId: whereObj.id,
    },
    settings,
  );

  await AddressesService.deleteWithParams(
    {
      entityName: "acceptance",
      entityId: whereObj.id,
    },
    settings,
  );

  return await Acceptances.destroy({ where: whereObj, ...settings });
};

module.exports.getByMobileNumber = async (mobile) => {
  const data = await Acceptances.findOne({
    where: { mobileNumber: mobile },
  });
  return data;
};

module.exports.getAcceptanceById = async (id) => {
  const acceptance = await Acceptances.findByPk(id, {
    include: [
      {
        required: false,
        model: EntityCategories,
        where: { entityName: "acceptance" },
        include: Categories,
      },
      {
        model: Addresses,
        required: false,
        where: { entityName: "acceptance" },
      },
      Drivers,
    ],
    raw: false,
    nest: true,
  });

  if (!acceptance)
    throw new ApplicationError("Приемки не существует", {
      path: "controllers",
    });

  return acceptance;
};

module.exports.getAcceptancesWithParams = async (queryParams) => {
  const data = await Acceptances.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "acceptance"),
    include: [
      {
        separate: true,
        required: false,
        model: EntityCategories,
        where: { entityName: "acceptance" },
        include: Categories,
      },
      {
        model: Addresses,
        required: false,
        where: { entityName: "acceptance" },
      },
      Drivers,
    ],
    separate: true,
    raw: false,
    distinct: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.getAcceptancesByCategory = async (categoryId) => {
  const data = await Acceptances.findAll({
    attributes: ["id"],
    include: [
      {
        model: EntityCategories,
        where: { entityName: "acceptance", materialCategoryId: categoryId },
      },
      {
        model: Addresses,
        required: false,
        where: { entityName: "acceptance" },
      },
      Drivers,
    ],
    raw: false,
    distinct: true,
    nest: true,
  });

  return data;
};

module.exports.createAcceptance = async (obj, settings = {}) => {
  return await Acceptances.create(obj, { ...settings }).then((data) => data);
};

module.exports.updateAcceptance = async (obj, whereObj, settings = {}) => {
  await Acceptances.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedAcceptance = await Acceptances.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedAcceptance;
};
