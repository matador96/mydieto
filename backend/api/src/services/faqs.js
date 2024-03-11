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

module.exports.updateOne = async (id, obj) => {
  const faq = await FAQs.findByPk(id, {
    raw: false,
  });
  await faq.update(obj);
  await faq.reload({
    raw: false,
    nest: true,
  });

  return faq;
};
