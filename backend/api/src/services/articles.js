const Articles = require("../models/articles");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");

module.exports.getById = async (id, settings = {}) => {
  const article = await Articles.findByPk(id, {
    ...settings,
    raw: false,
    nest: true,
  });

  if (!article)
    throw new ApplicationError("Каталог не найден", {
      path: "controllers",
    });

  return article;
};

module.exports.getByField = async (field) => {
  const data = await Articles.findOne({
    where: { ...field },
  });
  return data;
};

// module.exports.getWithParamsByParentId = async (queryParams) => {
//   const data = await Articles.findAndCountAll({
//     ...generateDatabaseSetting({ ...queryParams }, "article"),
//     include: [{ model: Articles, as: "parentArticle" }],
//     raw: false,
//     nest: true,
//   });

//   return { data: data.rows, count: data.count };
// };

module.exports.getWithParams = async (queryParams) => {
  const data = await Articles.findAndCountAll({
    ...generateDatabaseSetting(queryParams, "article"),
    raw: false,
    nest: true,
  });

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj, settings = {}) => {
  const article = await Articles.create(obj, { ...settings }).then(
    (resultEntity) => {
      const dataObj = resultEntity.get({ plain: true });
      return dataObj;
    },
  );

  return article;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Articles.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedArticle = await Articles.findOne({
    where: whereObj,
    ...settings,
    raw: false,
    nest: true,
  });

  return updatedArticle;
};
