const Drivers = require("../models/drivers");
const EntityCategories = require("./../models/entityCategories");
const Categories = require("../models/categories");
const Routes = require("../models/routes");
const RatingsService = require("../services/ratings");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

const EntityCategoriesService = require("./entityCategories");
const sequelize = require("../core/db");
const Sequelize = require("sequelize");

module.exports.getCount = async () => {
  const data = await Drivers.count();
  return data;
};

module.exports.deleteDriver = async (whereObj, settings = {}) => {
  await EntityCategoriesService.deleteWithParams(
    {
      entityName: "driver",
      entityId: whereObj.id,
    },
    settings,
  );

  return await Drivers.destroy({ where: whereObj, ...settings });
};

module.exports.getActiveCount = async () => {
  const data = await Drivers.count({
    where: {
      status: {
        $notIn: ["blocked", "pending"],
      },
    },
  });
  return data;
};

module.exports.getGroupedByDate = async () => {
  const data = await Drivers.findAll({
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

module.exports.getAmountOfDriversByStatus = async (status) => {
  const amount = Drivers.count({
    where: Sequelize.where(
      Sequelize.cast(Sequelize.col("drivers.status"), "varchar"),
      status,
    ),
  });
  return amount;
};

module.exports.getDriverById = async (id) => {
  const driver = await Drivers.findByPk(id, {
    include: [
      {
        model: EntityCategories,
        where: { entityName: "driver" },
        required: false,
        include: Categories,
      },
      {
        model: Routes,
        where: { status: "inwork" },
        required: false,
        as: "inWorkRoute",
      },
    ],
    raw: false,
    nest: true,
  });

  const data = driver.get({ plain: true });
  const hasInWorkRoutes = data?.inWorkRoute?.length > 0;
  if (hasInWorkRoutes) {
    data.isHaveInWorkRoute = true;
  } else {
    data.isHaveInWorkRoute = false;
  }

  const ratings = await RatingsService.getAverageRatingsByIds({
    // fromEntityType: "user",
    // actionForEntityType: "route",
    toEntityType: "driver",
    toEntityId: [id],
    status: "active",
  });

  // TODO переделать расчет рейтинга
  data.rating = ratings.find((e) => e.toEntityId === data.id)?.value || 0;
  if (data?.rating) {
    data.rating = Math.round(data.rating);
  }

  if (!data)
    throw new ApplicationError("Водителя не существует", {
      path: "controllers",
    });

  return data;
};

module.exports.getByMobileNumber = async (mobile) => {
  const data = await Drivers.findOne({
    where: { mobileNumber: mobile },
  });
  return data;
};

module.exports.getDriverByMobileNumber = async (mobileNumber) => {
  const driver = await Drivers.findOne({
    where: { mobileNumber: mobileNumber },
  });

  return driver;
};

module.exports.getDriversWithParams = async (queryParams) => {
  const data = await Drivers.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "driver"),
    include: [
      {
        model: EntityCategories,
        separate: true,
        where: { entityName: "driver" },
        include: Categories,
      },
    ],
    raw: false,
    distinct: true,
    nest: true,
  });

  const idsOfDrivers = data.rows.map((e) => e.id);

  const ratings = await RatingsService.getAverageRatingsByIds({
    // fromEntityType: "user",
    // actionForEntityType: "route",
    toEntityType: "driver",
    toEntityId: idsOfDrivers,
    status: "active",
  });

  const newRows = data.rows.map((e) => {
    const b = e.get({ plain: true });
    // TODO переделать расчет рейтинга
    b.rating = ratings.find((a) => a.toEntityId === b.id)?.value || 0;
    if (b?.rating) {
      b.rating = Math.round(b.rating);
    }
    return b;
  });

  return { data: newRows, count: data.count };
};

module.exports.createDriver = async (obj, settings = {}) => {
  const driver = await Drivers.create(obj, { ...settings }).then((data) =>
    data.get({ plain: true }),
  );

  return driver;
};

module.exports.updateDriver = async (obj, whereObj, settings = {}) => {
  await Drivers.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedUser = await Drivers.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedUser;
};
