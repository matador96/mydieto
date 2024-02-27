const passport = require("passport");
const Users = require("../../models/users");
const jwtOptions = require("../../core/auth/jwtConfig");
const JwtStrategy = require("passport-jwt").Strategy;

module.exports = () => {
  passport.use(
    // особо не понятно зачем это здесь
    new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
      const user = await Users.findOne({
        where: { id: jwt_payload.id },
        attributes: ["id", "email"],
        raw: true,
        nest: true,
      });

      if (user) {
        next(null, {
          profile: user,
        });
      } else {
        next(null, false);
      }
    }),
  );
};
