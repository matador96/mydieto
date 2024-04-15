const { body } = require("express-validator");
const InstructorService = require("../services/instructors");
const UserService = require("../services/users");
const Encrypt = require("../core/encrypt");
const { uploadImageFile, deleteImageFile } = require("../core/s3");
require("dotenv").config();

module.exports.getWithParams = async (req) => {
  const result = await InstructorService.getWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const { email, password, ...instructorData } = req.body;

  const userData = {
    email: email,
    password: await Encrypt.cryptPassword(password),
  };

  const createdUser = await UserService.createUser(userData, { transaction });
  instructorData.userId = createdUser.id;

  let imageObj = {};

  if (req?.files?.image) {
    const image = req?.files?.image;
    if (image) {
      imageObj = await uploadImageFile(req?.files?.image);
    }
  }

  await InstructorService.create(
    { ...instructorData, ...imageObj },
    { transaction },
  );

  return {
    data: createdUser,
  };
};

module.exports.getById = async (req) => {
  const { id } = req.params;
  const data = await InstructorService.getById(id);

  return { data };
};

module.exports.getTags = async () => {
  const result = await InstructorService.getTags();
  return { data: result.data };
};

module.exports.update = async (req) => {
  const { id } = req.params;
  const userObj = { ...req.body };

  let imageObj = {};

  if (req?.files?.image) {
    const image = req?.files?.image;
    if (image) {
      imageObj = await uploadImageFile(req?.files?.image);

      InstructorService.getById(id).then((instructor) => {
        if (instructor.imageId) {
          const imageId = instructor.imageId;
          deleteImageFile(process.env.MINIO_BUCKET_FOLDER, imageId);
        }
      });
    }
  }

  const userData = await InstructorService.update(
    { ...userObj, ...imageObj },
    { id },
  );

  return {
    data: userData,
  };
};

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [body("email").isString(), body("password").isString()];
    }

    case "create": {
      return [body("firstName").isString(), body("lastName").isString()];
    }

    case "update": {
      return [
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("email").isString().optional(),
      ];
    }

    default:
      break;
  }
};
