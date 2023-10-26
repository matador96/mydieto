const Leads = require("../models/leads");
const Sellers = require("../models/sellers");
const Categories = require("../models/categories");
const Addresses = require("../models/addresses");
const Images = require("./../models/images");
const Statuses = require("./../enums/statuses");
const Ratings = require("../models/ratings");
const ImagesService = require("./images");
const Routes = require("./../models/routes");
const Users = require("./../models/users");
const { generateDatabaseSetting } = require("../helpers/db");
const _ = require("lodash");

const sequelize = require("../core/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Leads.count();
  return data;
};

module.exports.getActiveCount = async () => {
  const data = await Leads.count({
    where: {
      status: {
        $notIn: ["blocked"],
      },
    },
  });
  return data;
};

module.exports.deleteLead = async (whereObj, settings = {}) => {
  await ImagesService.deleteImage(
    {
      leadId: whereObj.id,
    },
    settings,
  );
  return await Leads.destroy({ where: whereObj, ...settings });
};

module.exports.getGroupedByDate = async () => {
  const data = await Leads.findAll({
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

module.exports.getFinishedLeadsCapacities = async () => {
  const data = await Leads.sum("capacity", {
    where: {
      status: "finished",
    },
  });
  return data;
};

module.exports.getFinishedLeadsCapacitiesByDate = async (date) => {
  const data = await Leads.sum("capacity", {
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

module.exports.getActiveOrInWorkLeadsCountOfSellerById = async (sellerId) => {
  const data = await Addresses.findAndCountAll({
    page: 1,
    limit: 1000,
    attributes: ["id"],
    where: { entityName: "seller", entityId: sellerId },
  });

  const ids = data.rows.map((e) => e.id);

  const count = await Leads.count({
    where: {
      addressId: {
        $in: ids,
      },
      status: {
        $in: ["active", "inwork"],
      },
    },
  });

  return count;
};

module.exports.getLeadById = async (id, settings = {}) => {
  const lead = await Leads.findByPk(id, {
    include: [
      Images,
      {
        model: Addresses,
        include: Sellers,
      },
      Categories,
      Routes,
      {
        model: Ratings,
        required: false,
        where: { actionForEntityType: "lead" },
        attributes: ["id", "value", "valueInFloat", "status", "comment"],
      },
      {
        model: Users,
        required: false,
        attributes: ["id", "firstName", "lastName", "post", "roleId"],
      },
    ],
    raw: false,
    nest: true,
    ...settings,
  });

  if (!lead)
    throw new ApplicationError("Заявки не существует", {
      path: "controllers",
    });

  return lead;
};

module.exports.getLeadsWithParams = async (queryParams) => {
  const data = await Leads.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "lead"),
    include: [
      Images,
      {
        model: Addresses,
        include: Sellers,
        ...(queryParams.districtId !== undefined
          ? {
              where: {
                districtId: queryParams.districtId,
              },
            }
          : {}),
        ...(queryParams.sellerId !== undefined
          ? {
              where: {
                entityName: "seller",
                entityId: queryParams.sellerId,
              },
            }
          : {}),
      },
      Categories,
      {
        model: Ratings,
        required: false,
        where: { actionForEntityType: "lead" },
        attributes: ["id", "value", "valueInFloat", "status", "comment"],
      },
      {
        model: Users,
        required: false,
        attributes: ["id", "firstName", "lastName", "post", "roleId"],
      },
    ],
    raw: false,
    distinct: true,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.createLead = async (obj, settings = {}) => {
  const lead = await Leads.create(obj, { ...settings }).then((data) =>
    data.get({ plain: true }),
  );

  return lead;
};

module.exports.updateRouteIdOfLeads = async (
  arr,
  routeId,
  status,
  settings = {},
) => {
  const leadIds = _.map(
    await Leads.findAll({
      attributes: ["id"],
      where: { routeId },
    }),
    "id",
  );

  await Leads.update(
    {
      routeId: null,
    },
    {
      where: { id: leadIds },
      ...settings,
    },
  );

  let obj = {
    routeId: routeId,
  };

  if (status && status !== Statuses.BLOCKED) {
    obj.status = status;
  }

  await Leads.update(obj, {
    where: { id: arr },
    ...settings,
  });

  return;
};

module.exports.getLeadsByAddressIds = async (arr) => {
  const data = await Leads.findAll({
    page: 1,
    limit: 100,
    where: { addressId: arr },
  });

  return data;
};

module.exports.resetLeadAdressesByIds = async (arr, settings = {}) => {
  await Leads.update(
    {
      addressId: null,
    },
    {
      where: { addressId: arr },
      ...settings,
    },
  );
  return;
};

module.exports.updateLeadStatusesByRouteId = async (
  routeId,
  status,
  settings = {},
) => {
  const leadIds = _.map(
    await Leads.findAll({
      attributes: ["id"],
      where: { routeId },
    }),
    "id",
  );

  await Leads.update(
    {
      status: status,
    },
    {
      where: { id: leadIds },
      ...settings,
    },
  );

  return;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Leads.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedData = await Leads.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedData;
};
