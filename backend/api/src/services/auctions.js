const Acceptances = require("../models/acceptances");
const Auctions = require("../models/auctions");
const AuctionPrices = require("../models/auctionPriceList");
const { generateDatabaseSetting } = require("../helpers/db");
const Leads = require("../models/leads");
const Sellers = require("../models/sellers");
const Categories = require("../models/categories");
const Addresses = require("../models/addresses");
const Images = require("./../models/images");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Auctions.count();
  return data;
};

module.exports.deleteAuction = async (whereObj, settings = {}) => {
  await AuctionPrices.destroy({
    where: {
      auctionId: whereObj.id,
    },
    ...settings,
  });

  return await Auctions.destroy({ where: whereObj, ...settings });
};

module.exports.deleteAuctionPrices = async (whereObj, settings = {}) => {
  return await AuctionPrices.destroy({ where: whereObj, ...settings });
};

module.exports.getFullInfoByAuctionId = async (id) => {
  const auction = await Auctions.findByPk(id, {
    include: [
      {
        model: Leads,
        include: [
          Images,
          {
            model: Addresses,
            include: Sellers,
          },
          Categories,
        ],
      },
      {
        model: AuctionPrices,
        include: [Acceptances],
      },
    ],
    raw: false,
    nest: true,
  });

  if (!auction)
    throw new ApplicationError("Торга не существует", {
      path: "controllers",
    });

  return auction;
};

module.exports.getAuctionById = async (id) => {
  const auction = await Auctions.findByPk(id, {
    include: [
      Leads,
      {
        model: AuctionPrices,
        include: [Acceptances],
      },
      Acceptances,
    ],
    raw: false,
    nest: true,
  });

  if (!auction)
    throw new ApplicationError("Аукциона не существует", {
      path: "controllers",
    });

  return auction;
};

module.exports.getAuctionsWithParams = async (queryParams) => {
  const data = await Auctions.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "auction"),
    raw: false,
    distinct: true,
    nest: true,
    separate: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.getPricesByAuctionId = async (id, queryParams) => {
  const prices = await AuctionPrices.findAll({
    ...generateDatabaseSetting(queryParams, "auctionPrices"),
    attributes: {
      exclude: ["auctionId"],
    },
    where: {
      auctionId: id,
    },
    include: [Acceptances],
    raw: false,
    nest: true,
  });

  if (!prices)
    throw new ApplicationError("Цен не найдено", {
      path: "controllers",
    });

  return prices;
};

module.exports.createAuction = async (obj, settings = {}) => {
  const auction = await Auctions.create(obj, { ...settings }).then((data) => data);
  return auction;
};

module.exports.updateAuction = async (obj, whereObj, settings = {}) => {
  await Auctions.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedAuction = await Auctions.findOne({
    where: whereObj,
    ...settings,
    include: [
      {
        model: Leads,
        include: [
          Images,
          {
            model: Addresses,
            include: Sellers,
          },
          Categories,
        ],
      },
      {
        model: AuctionPrices,
        include: [Acceptances],
      },
    ],

    raw: false,
    nest: true,
  });

  const data = updatedAuction.get({ plain: true });

  return data;
};

module.exports.getAuctionPrice = async (whereObj) => {
  const auctionPrice = await AuctionPrices.findOne({
    where: whereObj,
  });

  return auctionPrice;
};

module.exports.getAcceptancesByAuctionId = async (id) => {
  const auction = await Auctions.findByPk(id, {
    include: [
      {
        model: Acceptances,
      },
    ],
    raw: false,
    nest: true,
  });
  return auction.acceptances;
};

module.exports.deleteAuctionPricesByAuctionId = async (whereObj, settings = {}) => {
  await AuctionPrices.destroy({
    where: whereObj,
    ...settings,
  });

  return;
};

module.exports.setAuctionPrice = async (obj) => {
  const auctionPrice = await AuctionPrices.upsert(obj);

  return auctionPrice;
};
