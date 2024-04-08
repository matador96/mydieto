const Reviews = require("../models/reviews");
const { generateDatabaseSetting } = require("../helpers/db");
const Courses = require("../models/courses");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id) => {
  const data = await Reviews.findByPk(id);
  if (!data)
    throw new ApplicationError("Review не существует", {
      path: "controllers",
    });

  return data;
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Reviews.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "review"),
    include: [{ model: Courses }],
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj) => {
  const data = await Reviews.create(obj).then((data) => data.get({ plain: true }));

  return data;
};

module.exports.update = async (id, obj) => {
  const review = await Reviews.findByPk(id, {
    raw: false,
  });
  await review.update(obj);
  await review.reload({
    raw: false,
    nest: true,
  });

  return review;
};
