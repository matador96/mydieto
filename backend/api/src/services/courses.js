const Courses = require("../models/courses");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

const { Instructors } = require("../models/users");

module.exports.getById = async (id, settings = {}) => {
  const data = await Courses.findByPk(id, {
    ...settings,
    raw: false,
    nest: true,
  });

  if (!data)
    throw new ApplicationError("Не найдено", {
      path: "controllers",
    });

  return data;
};

module.exports.getByField = async (field) => {
  const data = await Courses.findOne({
    where: { ...field },
  });
  return data;
};

module.exports.getTags = async () => {
  let tags = new Set();
  let data = await Courses.findAll({
    attributes: ["tags"],
    raw: false,
  });

  data = JSON.stringify(data);
  data = JSON.parse(data);

  data.forEach((item) => {
    item.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return { data: [...tags] };
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Courses.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "course"),
    include: [Instructors],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const result = await Courses.create(obj, { ...settings }).then((resultEntity) => {
    const dataObj = resultEntity.get({ plain: true });
    return dataObj;
  });

  return result;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Courses.update(obj, {
    where: whereObj,
    ...settings,
  });

  const updatedData = await Courses.findOne({
    where: whereObj,
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedData;
};
