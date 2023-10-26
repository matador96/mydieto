const ImageService = require("../services/images");

module.exports.create = async (req, res, transaction) => {
  if (!req.files) {
    return res.status(400).send("Нет переданных файлов");
  }

  const image = req.files.image;
  const fileData = await ImageService.uploadImageToDisk(image);

  let imageData = await ImageService.createImage(fileData, { transaction });

  return {
    data: imageData,
  };
};
