const Minio = require("minio");
const { AnotherServiceError } = require("./../classes/Errors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const config = {
  endPoint: process.env.MINIO_ENDPOINT || "127.0.0.1",
  port: parseInt(process.env.MINIO_PORT) || 9000,
  accessKey: process.env.MINIO_ACCESS_KEY || "p3361JuwuaEi7NLtbXgD",
  secretKey:
    process.env.MINIO_SECRET_KEY || "UdUJvydHOXkRrGryaMCOb535k5EVUszRDOucL6Bn",
  useSSL: !!process.env?.MINIO_USE_SSL,
  region: "ru-1",
  amzBucketRegion: "ru-1",
};

const MINIO_FILE_PUBLIC_HOST =
  process.env.MINIO_FILE_PUBLIC_HOST ||
  `${config.endPoint}:${config.port}/${process.env.MINIO_BUCKET_FOLDER}`;

const minio = new Minio.Client(config);

module.exports.config = config;
module.exports.minio = minio;

module.exports.deleteImageFile = (bucket, objectName) => {
  return new Promise((resolve, _reject) => {
    return minio.removeObject(bucket, objectName, function (err) {
      if (err) {
        console.error("Unable to remove object: ", err);
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

module.exports.uploadImageFile = async (imageFile) => {
  try {
    const fileType = imageFile.mimetype.replace("image/", "");
    let data = imageFile.data;

    const fileNameWithUUID = `${uuidv4()}.${fileType}`;
    await minio.putObject(process.env.MINIO_BUCKET_FOLDER, fileNameWithUUID, data);

    const publicUrl = `http${
      config.useSSL ? "s" : ""
    }://${MINIO_FILE_PUBLIC_HOST}/${fileNameWithUUID}`;

    const obj = {
      imageId: fileNameWithUUID,
      imageUrl: publicUrl,
    };

    return obj;
  } catch (e) {
    throw new AnotherServiceError(e.message);
  }
};
