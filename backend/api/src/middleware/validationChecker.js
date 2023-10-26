const { ApiValidationError } = require("./../classes/Errors");
const { validationResult } = require("express-validator");

module.exports = {
  validationChecker: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ApiValidationError(null, errors.array());
      return res.status(error.statusCode()).json({ error: error.requestObj() });
    }

    next();
  },
};
