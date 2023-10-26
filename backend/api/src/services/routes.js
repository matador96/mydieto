const Routes = require("../models/routes");
const Drivers = require("../models/drivers");
const Leads = require("../models/leads");
const { generateDatabaseSetting } = require("../helpers/db");
const Addresses = require("../models/addresses");
const Sellers = require("../models/sellers");
const Ratings = require("../models/ratings");

const Images = require("../models/images");

const Categories = require("../models/categories");
const { ApplicationError } = require("./../classes/Errors");

const sequelize = require("../core/db");

module.exports.getCount = async () => {
  const data = await Routes.count();
  return data;
};

module.exports.getActiveCount = async () => {
  const data = await Routes.count({
    where: {
      status: {
        $notIn: ["blocked"],
      },
    },
  });
  return data;
};

module.exports.getGroupedByDate = async () => {
  const data = await Routes.findAll({
    attributes: [
      [sequelize.cast(sequelize.col("createdAt"), "date"), "date"],
      [sequelize.fn("COUNT", sequelize.col("*")), "count"],
    ],
    where: {
      createdAt: {
        $gte: sequelize.literal("now() - interval '30 days'"),
      },
    },
    group: "date",
    // order: [["createdAt", "DESC"]],
  });

  return data;
};

module.exports.getFinishedRoutesCommissions = async () => {
  const data = await Routes.sum("commission", {
    where: {
      status: "finished",
    },
  });
  return data;
};

module.exports.getFinishedRoutesCommissionsByDate = async (date) => {
  const data = await Leads.sum("commission", {
    where: {
      $and: [
        sequelize.where(
          sequelize.literal('EXTRACT (YEAR FROM "updatedAt")'),
          date.year,
        ),
        sequelize.where(
          sequelize.literal('EXTRACT (MONTH FROM "updatedAt")'),
          date.month,
        ),
        sequelize.where(
          sequelize.literal('EXTRACT (DAY FROM "updatedAt")'),
          date.day,
        ),
        {
          status: "finished",
        },
      ],
    },
  });
  return data;
};

module.exports.getRouteInfoById = async (id) => {
  const route = await Routes.findByPk(id);

  if (!route)
    throw new ApplicationError("Маршрут не существует", {
      path: "controllers",
    });

  return route;
};

module.exports.getRouteById = async (id) => {
  const route = await Routes.findByPk(id, {
    include: [
      {
        model: Leads,
        limit: 40,
        order: [["id", "DESC"]],
        include: [
          Images,
          Categories,
          {
            model: Addresses,
            include: Sellers,
          },
        ],
      },
      Drivers,
    ],
    raw: false,
    nest: true,
  });

  if (!route)
    throw new ApplicationError("Маршрут не существует", {
      path: "controllers",
    });

  return route;
};

module.exports.getRoutesWithParams = async (queryParams, settings) => {
  const { isRequiredLeads } = settings;

  const data = await Routes.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "route"),
    include: [
      {
        model: Leads,
        required: isRequiredLeads,
        limit: 40,
        order: [["id", "ASC"]],
        include: [
          Categories,
          {
            model: Addresses,
            include: Sellers,
          },
        ],
      },
      Drivers,
      {
        model: Ratings,
        required: false,
        where: { actionForEntityType: "route" },
        attributes: ["id", "value", "valueInFloat", "status"],
      },
    ],
    raw: false,
    nest: true,
    distinct: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createRoute = async (obj, settings = {}) => {
  const route = await Routes.create(obj, { ...settings }).then((data) =>
    data.get({ plain: true }),
  );

  return route;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Routes.update(obj, {
    where: whereObj,
    ...settings,
  });

  const updatedData = await Routes.findOne({
    where: whereObj,
    ...settings,
    include: [Leads, Drivers],
    raw: false,
    nest: true,
  });

  return updatedData;
};

module.exports.deleteRoute = async (whereObj, settings = {}) => {
  return await Routes.destroy({ where: whereObj, ...settings });
};
