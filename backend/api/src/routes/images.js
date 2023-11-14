const ImageController = require("../controllers/image");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "post",
    url: "/api/v1/image",
    middlewares: [authenticate, validationChecker],
    withTransaction: true,
    method: ImageController.create,
  },
];
