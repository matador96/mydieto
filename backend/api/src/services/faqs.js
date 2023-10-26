const FAQs = require("../models/faqs");
const { generateDatabaseSetting } = require("../helpers/db");

const { ApplicationError } = require("./../classes/Errors");

module.exports.deleteFAQ = async (whereObj) => {
  return await FAQs.destroy({ where: whereObj });
};

module.exports.getFAQById = async (id) => {
  const data = await FAQs.findByPk(id);
  if (!data)
    throw new ApplicationError("FAQ не существует", {
      path: "controllers",
    });

  return data;
};

module.exports.getFAQsWithParams = async (queryParams) => {
  const data = await FAQs.findAndCountAll(
    generateDatabaseSetting(queryParams, "faq"),
  );

  return { data: data.rows, count: data.count };
};

module.exports.createFAQ = async (obj) => {
  const data = await FAQs.create(obj).then((data) => data.get({ plain: true }));

  return data;
};

module.exports.updateFAQ = async (obj, whereObj) => {
  await FAQs.update(obj, {
    where: whereObj,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedData = await FAQs.findOne({
    where: whereObj,
    //...settings,
  });

  return updatedData;
};
