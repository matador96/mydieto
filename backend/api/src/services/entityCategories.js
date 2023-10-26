const EntityCategories = require("../models/entityCategories");

const getEntityCategories = async (entityId, entityName) => {
  const data = await EntityCategories.findAndCountAll({
    page: 1,
    limit: 100,
    where: { entityId, entityName },
  });

  return { data: data.rows, count: data.count };
};

const deleteWithParams = async (obj, settings = {}) => {
  await EntityCategories.destroy({
    where: obj,
    ...settings,
  });

  return;
};

const create = async (obj) => {
  // { ...settings } transactions работает не для всех почему то
  const data = await EntityCategories.create(obj).then((data) => data);
  return data;
};

const update = async (obj, whereObj, settings = {}) => {
  const data = await EntityCategories.update(obj, {
    where: whereObj,
    ...settings,
  }).then((data) => data);

  return data;
};

const normalizeEntityCategoriesWithExtraFields = async (
  arrOfCategories,
  entityId,
  entityName,
  transaction,
) => {
  const promisses = [];
  const { data } = await getEntityCategories(entityId, entityName);

  const allCategoriesOfEntityIds = data.map((e) => e.materialCategoryId);

  const arrOfCategoryIds = arrOfCategories.map((e) => e.materialCategoryId);

  const deletedCategoryIds = allCategoriesOfEntityIds.filter(
    (item) => !arrOfCategoryIds.includes(item),
  );

  deletedCategoryIds.forEach(async (materialCategoryId) => {
    promisses.push(
      await deleteWithParams(
        { entityId, entityName, materialCategoryId },
        { transaction },
      ),
    );
  });

  // Maybe need create
  const addedCategoryIds = arrOfCategoryIds.filter(
    (item) => !allCategoriesOfEntityIds.includes(item),
  );

  addedCategoryIds.forEach(async (materialCategoryId) => {
    let extraFields = arrOfCategories.find(
      (e) => e.materialCategoryId === materialCategoryId,
    );

    promisses.push(
      await create(
        {
          materialCategoryId,
          entityName,
          entityId,
          ...extraFields,
        },
        { transaction },
      ),
    );
  });

  // Maybe need update
  const updatedCategoryIds = data.filter(
    (item) => !allCategoriesOfEntityIds.includes(item),
  );

  updatedCategoryIds.forEach(async (d) => {
    let extraFields = arrOfCategories.find(
      (e) => e.materialCategoryId === d.materialCategoryId,
    );
    promisses.push(
      await update(
        extraFields,
        {
          materialCategoryId: d.materialCategoryId,
          entityName: d.entityName,
          entityId: d.entityId,
        },
        { transaction },
      ),
    );
  });

  // update напсиать

  await Promise.all(promisses);

  return;
};

const normalizeEntityCategories = async (
  arrOfCategoryIds,
  entityId,
  entityName,
  transaction,
) => {
  const promisses = [];
  const { data } = await getEntityCategories(entityId, entityName);

  const allCategoriesOfEntityIds = data.map((e) => e.materialCategoryId);

  // Maybe need delete

  const deletedCategoryIds = allCategoriesOfEntityIds.filter(
    (item) => !arrOfCategoryIds.includes(item),
  );

  deletedCategoryIds.forEach(async (materialCategoryId) => {
    promisses.push(
      await deleteWithParams(
        { entityId, entityName, materialCategoryId },
        { transaction },
      ),
    );
  });

  // Maybe need create

  const addedCategoryIds = arrOfCategoryIds.filter(
    (item) => !allCategoriesOfEntityIds.includes(item),
  );

  addedCategoryIds.forEach(async (materialCategoryId) => {
    promisses.push(
      await create(
        {
          materialCategoryId,
          entityName,
          entityId,
        },
        { transaction },
      ),
    );
  });

  await Promise.all(promisses);

  return;
};

module.exports = {
  normalizeEntityCategories,
  getEntityCategories,
  normalizeEntityCategoriesWithExtraFields,
  deleteWithParams,
};
