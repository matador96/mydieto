const Ratings = require("../models/ratings");
const Sellers = require("../models/sellers");
const Users = require("../models/users");
const Leads = require("../models/leads");
const Drivers = require("../models/drivers");
const Routes = require("../models/routes");
const sequelize = require("sequelize");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

const includeName = {
  udr: "userDriverRoute",
  sdl: "sellerDriverLead",
};

const ratingBundleSystem = {
  // 1 связок это user -> driver -> route
  userDriverRoute: {
    include: [
      {
        model: Users,
        where: sequelize.where(sequelize.col("fromEntityType"), "user"),
      },
      {
        model: Drivers,
        where: sequelize.where(sequelize.col("toEntityType"), "driver"),
      },
      {
        model: Routes,
        where: sequelize.where(sequelize.col("actionForEntityType"), "route"),
      },
    ],
  },
  // 2 связка это seller -> driver -> lead
  sellerDriverLead: {
    include: [
      {
        model: Sellers,
        where: sequelize.where(sequelize.col("fromEntityType"), "seller"),
      },
      {
        model: Drivers,
        where: sequelize.where(sequelize.col("toEntityType"), "driver"),
      },
      {
        model: Leads,
        where: sequelize.where(sequelize.col("actionForEntityType"), "lead"),
      },
    ],
  },
};

module.exports.getAverageRatingsByIds = async (whereObj) => {
  const data = await Ratings.findAll({
    attributes: [
      "toEntityId",
      [sequelize.fn("AVG", sequelize.col("value")), "value"],
    ],
    where: whereObj,
    raw: true,
    distinct: true,
    nest: true,
    group: ["toEntityId"],
  });

  return data;
};

module.exports.getRatingById = async (id) => {
  const data = await Ratings.findByPk(id, {
    raw: false,
    distinct: true,
    nest: true,
  });

  if (!data)
    throw new ApplicationError("Рейтинга не существует", {
      path: "controllers",
    });

  return data;
};

module.exports.getRatingsWithParams = async (queryParams, bundleType = "udr") => {
  const include = ratingBundleSystem[includeName[bundleType]].include;
  const data = await Ratings.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "rating"),
    include,
    raw: false,
    distinct: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createRating = async (obj) => {
  const data = await Ratings.create(obj).then((data) => data.get({ plain: true }));

  return data;
};

module.exports.updateRating = async (obj, whereObj) => {
  await Ratings.update(obj, {
    where: whereObj,
  });

  const updatedRating = await Ratings.findOne({
    where: whereObj,
  });

  return updatedRating;
};

module.exports.deleteRating = async (whereObj, settings = {}) => {
  return await Ratings.destroy({ where: whereObj, ...settings });
};
