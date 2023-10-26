const MobileNumberController = require("../controllers/mobileNumber");

module.exports = [
  {
    type: "get",
    url: "/api/v1/mobile/check/:serviceName/:mobile",
    middlewares: [],
    method: MobileNumberController.getExistenceByNumber,
  },
];
