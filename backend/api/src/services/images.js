const Images = require("../models/images");
const { uploadImageFile, deleteImageFile } = require("../core/google/googleDrive");

const getCount = async () => {
  const data = await Images.count();
  return data;
};

const createImage = async (obj, settings = {}) => {
  const image = await Images.create(obj, { ...settings }).then((data) => data);
  return image;
};

const update = async (obj, whereObj, settings = {}) => {
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

const uploadImageToDisk = async (imageFile) => {
  const obj = uploadImageFile(imageFile);
  return obj;
};

const deleteImage = async (whereObj, settings = {}) => {
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

const getImagesByLeadId = async (leadId, settings = {}) => {
  const data = await Images.findAndCountAll({
    page: 1,
    limit: 100,
    where: { leadId },
    ...settings,
  });

  return { data: data.rows, count: data.count };
};

const normalizeLeadImages = async (arrOfImageIds, leadId, transaction) => {
  const promisses = [];
  const { data } = await getImagesByLeadId(leadId, { transaction });

  const allImageIds = data.map((e) => e.id);

  // Maybe need delete
  const deletedIds = allImageIds.filter((item) => !arrOfImageIds.includes(item));
  await Promise.all(
    deletedIds.map(async (id) => await deleteImage({ id }, { transaction })),
  );

  // Maybe need create
  const addedIds = arrOfImageIds.filter((item) => !allImageIds.includes(item));
  await Promise.all(
    addedIds.map(
      async (id) =>
        await update(
          {
            leadId,
          },
          { id },
          { transaction },
        ),
    ),
  );

  return;
};

module.exports = {
  uploadImageToDisk,
  update,
  createImage,
  deleteImage,
  normalizeLeadImages,
  getCount,
};
