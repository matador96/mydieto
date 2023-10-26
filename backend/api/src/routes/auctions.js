const AuctionController = require("../controllers/auction");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "get",
    url: "/api/v1/auction/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_auctions),
      AuctionController.validate("getAuctionById"),
      validationChecker,
    ],
    method: AuctionController.getAuctionById,
  },
  {
    type: "get",
    url: "/api/v1/auctions",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_auctions),
      AuctionController.validate("getAuctionsWithParams"),
      validationChecker,
    ],
    method: AuctionController.getAuctionsWithParams,
  },
  {
    type: "post",
    url: "/api/v1/auction",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_auctions),
      AuctionController.validate("createAuction"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.createAuction,
  },
  {
    type: "put",
    url: "/api/v1/auction/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_auctions),
      AuctionController.validate("updateAuction"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.updateAuction,
  },
  {
    type: "get",
    url: "/api/v1/auction/:id/start",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_auctions),
      AuctionController.validate("startAuction"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.startAuction,
  },
  {
    type: "get",
    url: "/api/v1/auction/:id/cancel",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_auctions),
      AuctionController.validate("cancelAuction"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.cancelAuction,
  },
  {
    type: "put",
    url: "/api/v1/auction/:id/finish",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_auctions),
      AuctionController.validate("finishAuction"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.finishAuction,
  },
  {
    type: "post",
    url: "/api/v1/auction/:id/price/add",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_edit_auctions),
      AuctionController.validate("addPriceToAuction"),
      validationChecker,
    ],
    method: AuctionController.addPriceToAuction,
  },
  {
    type: "get",
    url: "/api/v1/auction/:id/prices",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_auctions),
      AuctionController.validate("getPricesByAuctionId"),
      validationChecker,
    ],
    method: AuctionController.getPricesByAuctionId,
  },
  {
    type: "delete",
    url: "/api/v1/auction/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_auctions),
      AuctionController.validate("delete"),
      validationChecker,
    ],
    withTransaction: true,
    method: AuctionController.delete,
  },
];
