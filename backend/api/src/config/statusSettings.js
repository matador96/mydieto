const Statuses = require("../enums/statuses");

const allStatuses = [...Object.values(Statuses)];

const statusOfLeads = [
  Statuses.ACTIVE,
  Statuses.INWORK,
  Statuses.FINISHED,
  Statuses.BLOCKED,
  Statuses.INAUCTION,
  Statuses.WININAUCTION,
];

const statusesOfRoutes = [
  Statuses.ACTIVE,
  Statuses.BLOCKED,
  Statuses.FINISHED,
  Statuses.INWORK,
];

const statusesOfFAQs = [Statuses.PUBLISHED, Statuses.ARCHIVE];

const statusOfAcceptances = [Statuses.ACTIVE, Statuses.PENDING, Statuses.BLOCKED];

const statusOfAuctions = [
  Statuses.ACTIVE,
  Statuses.PENDING,
  Statuses.FINISHED,
  Statuses.ARCHIVE,
];

const statusesOfRatings = [Statuses.ACTIVE, Statuses.ARCHIVE];

module.exports = {
  allStatuses,
  statusOfLeads,
  statusesOfRoutes,
  statusesOfFAQs,
  statusOfAcceptances,
  statusOfAuctions,
  statusesOfRatings,
};
