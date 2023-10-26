const AcceptanceService = require("../services/acceptances");
const DriverService = require("../services/drivers");
const SellerService = require("../services/sellers");

module.exports.getExistenceByNumber = async (req, res) => {
  try {
    const { serviceName, mobile } = req.params;
    const servicesWithMethods = {
      acceptance: AcceptanceService,
      driver: DriverService,
      seller: SellerService,
    };

    if (!servicesWithMethods[serviceName]) throw Error("Такого сервиса нет");

    return res.status(200).json({
      data: !!(await servicesWithMethods[serviceName].getByMobileNumber(mobile)),
    });
  } catch (e) {
    return res.status(400).json({ errors: [e.message] });
  }
};
