const { google } = require("googleapis");
const { Readable } = require("stream");
const { AnotherServiceError } = require("./../../classes/Errors");
require("dotenv").config();

const FOLDERS = [process.env.GOOGLE_FOLDER_ID];

const AUTH = {
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
};

const googleAuth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth: googleAuth.fromJSON(AUTH) });

module.exports.generateId = async () => {
  try {
    const result = await drive.files.generateIds({count: 1});
    const ids = result.data.ids;
    return ids[0];
  } catch (e) {
    throw new AnotherServiceError(e.message);
  }
};

module.exports.uploadImageFile = async (imageFile, fileName, id) => {
  try {
    const imageStream = new Readable();
    imageStream.push(imageFile.data);
    imageStream.push(null);

    const pathParameters = {
      resource: {
        id: id,
        name: fileName || imageFile.name,
        mimeType: imageFile.mimeType,
        parents: FOLDERS,
      },
      media: {
        body: imageStream,
      },
      fields: "id, name, exportLinks",
    };

    const result = await drive.files.create(pathParameters);

    const obj = {
      id: result.data.id,
      url: "https://drive.google.com/uc?export=download&id=" + result.data.id,
    };

    return obj;
  } catch (e) {
    throw new AnotherServiceError(e.message);
  }
};

module.exports.deleteImageFile = async (imageFileId) => {
  try {
    await drive.files.delete({
      fileId: imageFileId,
    });
  } catch (e) {
    throw new AnotherServiceError(e.message);
  }
};
