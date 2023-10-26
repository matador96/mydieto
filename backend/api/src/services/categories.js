const Categories = require("../models/categories");
const { generateDatabaseSetting } = require("../helpers/db");
const { ApplicationError } = require("./../classes/Errors");
const EntityCategoriesService = require("./entityCategories");

module.exports.getCount = async () => {
  const data = await Categories.count();
  return data;
};

module.exports.getById = async (id) => {
  const data = await Categories.findByPk(id);

  if (!data)
    throw new ApplicationError("Категории не существует", {
      path: "controllers",
    });

  return data;
};

module.exports.deleteCategory = async (whereObj, settings = {}) => {
  await EntityCategoriesService.deleteWithParams(
    {
      materialCategoryId: whereObj.id,
    },
    settings,
  );

  await Categories.destroy({
    where: {
      parentId: whereObj.id,
    },
    ...settings,
  });

  return await Categories.destroy({ where: whereObj, ...settings });
};

module.exports.getWithParamsByParentId = async (queryParams) => {
  // parentId почему то стояло
  const data = await Categories.findAndCountAll({
    ...generateDatabaseSetting({ ...queryParams }, "category"),
  });

  return { data: data.rows, count: data.count };
};

module.exports.getWithParams = async (queryParams) => {
  const data = await Categories.findAndCountAll(
    generateDatabaseSetting(queryParams, "category"),
  );

  return { data: data.rows, count: data.count };
};

module.exports.create = async (obj) => {
  const data = await Categories.create(obj).then((data) =>
    data.get({ plain: true }),
  );

  return data;
};

module.exports.update = async (obj, whereObj) => {
  await Categories.update(obj, {
    where: whereObj,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedData = await Categories.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedData;
};
