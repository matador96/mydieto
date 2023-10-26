const ImageController = require("../controllers/image");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "post",
    url: "/api/v1/image",
    middlewares: [authenticate, roleChecker(Permissions.can_create_images)],
    withTransaction: true,
    method: ImageController.create,
  },
];
