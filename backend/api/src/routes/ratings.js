const RatingController = require("../controllers/rating");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/rating/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_ratings),
      RatingController.validate("getRatingById"),
      validationChecker,
    ],
    method: RatingController.getRatingById,
  },
  {
    type: "get",
    url: "/api/v1/sdl/:leadId",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_ratings),
      RatingController.validate("sdlById"),
      validationChecker,
    ],
    method: RatingController.sendRatingSmsForFinishedLead,
  },
  {
    type: "get",
    url: "/api/v1/ratings",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_ratings),
      RatingController.validate("getRatingsWithParams"),
      validationChecker,
    ],
    method: RatingController.getRatingsWithParams,
  },

  {
    type: "post",
    url: "/api/v1/rating",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_create_ratings),
      RatingController.validate("createRating"),
      validationChecker,
    ],
    method: RatingController.createRating,
  },
  {
    type: "put",
    url: "/api/v1/rating/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_ratings),
      RatingController.validate("updateRating"),
      validationChecker,
    ],
    method: RatingController.updateRating,
  },
  {
    type: "post",
    url: "/api/v1/rating/public",
    // RatingController.validate("addPublicRating"), validationChecker
    middlewares: [],
    method: RatingController.addRatingFromPublic,
  },
  {
    type: "delete",
    url: "/api/v1/rating/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_ratings),
      RatingController.validate("delete"),
      validationChecker,
    ],
    method: RatingController.delete,
  },
];
