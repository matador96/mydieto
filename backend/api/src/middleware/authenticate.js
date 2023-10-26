const passport = require("passport");
const { isBlocked } = require("../helpers/status");

module.exports = {
  authenticate: (req, res, next) => {
    if (req.isApiKeyValid) {
      next();
      return;
    }

    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return res
          .status(err.statusCode || 401)
          .json({ error: { message: err.toString() } });
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: { message: "Пользователь не авторизован" } });
      }

      if (isBlocked(user.profile)) {
        return res
          .status(423)
          .json({ error: { message: "Пользователь заблокирован" } });
      }

      req.user = user;

      next();
    })(req, res, next);
  },
};
