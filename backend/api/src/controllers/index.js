const { UnknownError } = require("../classes/Errors");

module.exports.errorResponse = (res, e) => {
  if (!e?.statusCode) {
    let unkownError = new UnknownError(null);
    return res
      .status(unkownError.statusCode())
      .json({ error: unkownError.requestObj() });
  }

  return res.status(e.statusCode()).json({ error: e.requestObj() });
};

module.exports.successResponse = (res, obj) => {
  return res.status(200).json(obj);
};
