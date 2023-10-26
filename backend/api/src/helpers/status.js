const Statuses = require("../enums/statuses");
const isBlocked = (user) => {
  return user.status === Statuses.BLOCKED;
};

module.exports = {
  isBlocked,
};
