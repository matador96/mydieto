const { Users, Admins, Instructors, Clients } = require("../models/users");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

module.exports.getCount = async () => {
  const data = await Instructors.count();
  return data;
};

module.exports.getById = async (id) => {
  const user = await Instructors.findByPk(id, {
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
  let data = await Instructors.findAll({
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
  const data = await Instructors.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "user"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const user = await Instructors.create(obj, {
    ...settings,
  }).then((data) => data.get({ plain: true }));

  return user;
};

module.exports.update = async (obj, whereObj) => {
  const data = await Instructors.findByPk(whereObj.id, {
    raw: false,
  });
  await data.update(obj);
  await data.reload({
    raw: false,
    nest: true,
  });

  return data;
};
