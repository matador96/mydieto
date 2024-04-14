const { Users, Admins, Instructors, Clients } = require("../models/users");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Clients.count();
  return data;
};

module.exports.getOneByFields = async (fields) => {
  const data = await Clients.findOne({
    where: { ...fields },
  });
  return data;
};

module.exports.getById = async (id) => {
  const user = await Clients.findByPk(id, {
    include: [Users],
    raw: false,
    nest: true,
  });

  if (!user)
    throw new ApplicationError("Данные не верны", {
      path: "controllers",
    });

  return user;
};

module.exports.getTags = async () => {
  let tags = new Set();
  let data = await Clients.findAll({
    attributes: ["posts"],
    raw: false,
  });

  data = JSON.stringify(data);
  data = JSON.parse(data);

  data.forEach((item) => {
    item.posts.forEach((tag) => {
      tags.add(tag);
    });
  });

  return { data: [...tags] };
};

module.exports.getWithParams = async (queryParams) => {
  // http://localhost:3002/api/v1/instructors?whereQuery={"firstName": {"$like":"%25атерин%25"}}

  const settings = {
    ...generateDatabaseSetting(queryParams, "user"),
    raw: false,
    nest: true,
  };

  if (queryParams.whereQuery) {
    settings.where = JSON.parse(queryParams.whereQuery);
  }

  const data = await Clients.findAndCountAll(settings);

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const user = await Clients.create(obj, {
    ...settings,
    raw: false,
    nest: true,
  }).then((data) => data.get({ plain: true }));

  return user;
};

module.exports.update = async (obj, whereObj) => {
  const data = await Clients.findByPk(whereObj.id, {
    raw: false,
  });
  await data.update(obj);
  await data.reload({
    raw: false,
    nest: true,
  });

  return data;
};
