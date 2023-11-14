const Images = require("../models/images");
const { uploadImageFile, deleteImageFile } = require("../core/google/googleDrive");

module.exports.create = async (obj, settings = {}) => {
  const image = await Images.create(obj, { ...settings }).then((data) => data);
  return image;
};

module.exports.update = async (obj, whereObj, settings = {}) => {
  await Images.update(obj, {
    where: whereObj,
    ...settings,
    // returning: true, Не подходит получение данных после апдейта, так как оно не фильтровано
    // plain: true,
  });

  const updatedData = await Images.findOne({
    where: whereObj,
    ...settings,
  });

  return updatedData;
};

module.exports.uploadImageToDisk = async (imageFile) => {
  const obj = uploadImageFile(imageFile);
  return obj;
};

module.exports.deleteImage = async (whereObj, settings = {}) => {
  const deletedData = await Images.findOne({
    where: whereObj,
    ...settings,
  });

  if (deletedData) {
    try {
      await deleteImageFile(deletedData);
    } catch (e) {
      console.log(e);
    }
  }

  await Images.destroy({
    where: whereObj,
    ...settings,
  });

  return;
};

module.exports.getImagesByCatalogId = async (catalogId, settings = {}) => {
  const data = await Images.findAndCountAll({
    page: 1,
    limit: 100,
    where: { catalogId },
    ...settings,
  });

  return { data: data.rows, count: data.count };
};

module.exports.normalizeImages = async (arrOfImageIds, catalogId, transaction) => {
  const { data } = await this.getImagesByCatalogId(catalogId, { transaction });

  const allImageIds = data.map((e) => e.id);

  // Maybe need delete
  const deletedIds = allImageIds.filter((item) => !arrOfImageIds.includes(item));
  await Promise.all(
    deletedIds.map(async (id) => await this.deleteImage({ id }, { transaction })),
  );

  // Maybe need create
  const addedIds = arrOfImageIds.filter((item) => !allImageIds.includes(item));
  await Promise.all(
    addedIds.map(
      async (id) =>
        await this.update(
          {
            catalogId,
          },
          { id },
          { transaction },
        ),
    ),
  );

  return;
};
