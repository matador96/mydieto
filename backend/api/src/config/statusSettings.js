const Statuses = require("../enums/statuses");

const allStatuses = [...Object.values(Statuses)];

const statusesOfArticles = [Statuses.ACTIVE, Statuses.BLOCKED, Statuses.ARCHIVED];
const statusesOfCourses = [Statuses.ACTIVE, Statuses.BLOCKED, Statuses.ARCHIVED];
const statusesOfUsers = [Statuses.ACTIVE, Statuses.BLOCKED];

const statusesOfReviews = [Statuses.ACTIVE, Statuses.ARCHIVED];

module.exports = {
  allStatuses,
  statusesOfArticles,
  statusesOfUsers,
  statusesOfCourses,
  statusesOfReviews,
};
