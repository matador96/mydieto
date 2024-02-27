const {
  generateId,
  uploadImageFile,
  deleteImageFile,
} = require("../core/google/googleDrive");

module.exports.uploadImageToDisk = async (imageFile, article) => {
  try {
    const id = await generateId();
    const fileName = `${id}-${article.id}`;
    const obj = await uploadImageFile(imageFile, fileName, id);
    return obj;
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteImage = async (imageId) => {
  try {
    await deleteImageFile(imageId);
  } catch (e) {
    console.log(e);
  }
  return;
};
