const ConstController = require("../controllers/const");

module.exports = [
  {
    type: "get",
    url: "/api/v1/const/districts",
    middlewares: [],
    method: ConstController.getDistricts,
  },
];
