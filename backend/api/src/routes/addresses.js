const AddressController = require("../controllers/address");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");

module.exports = [
  {
    type: "get",
    url: "/api/v1/address/suggestions",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_view_addresses),
      AddressController.validate("getAddressesWithSuggestions"),
      validationChecker,
    ],
    method: AddressController.getAddressesWithSuggestions,
  },
];
