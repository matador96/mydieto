const LivenessController = require("../controllers/liveness");

module.exports = [
  {
    type: "get",
    url: "/api/v1/probe/liveness",
    middlewares: [],
    method: LivenessController.getTestData,
  },
];
