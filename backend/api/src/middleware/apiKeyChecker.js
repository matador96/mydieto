require("dotenv").config();

module.exports = {
  apiKeyChecker: (req, res, next) => {
    const API_KEY_FROM_HEADER = req.get("API_KEY");
    const isHaveAnyApiKey = API_KEY_FROM_HEADER !== undefined;

    if (isHaveAnyApiKey) {
      if (API_KEY_FROM_HEADER === process.env.API_KEY) {
        req.isApiKeyValid = true;
      } else {
        return res.status(403).json({ error: { message: "Апи ключ не верный" } });
      }
    }

    next();
  },
};
