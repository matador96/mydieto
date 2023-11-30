const Statuses = require("../enums/statuses");

const allStatuses = [...Object.values(Statuses)];

const statusesOfAddresses = [...allStatuses];
const statusesOfCatalogs = [...allStatuses];
const statusesOfOrders = [
  Statuses.ONEVALUATION,
  Statuses.ONCONFIRMATION,
  Statuses.WAITDELIVERY,
  Statuses.FINISHED,
  Statuses.CANCELED,
];
const statusesOfOrderItems = [...allStatuses];

module.exports = {
  allStatuses,
  statusesOfCatalogs,
  statusesOfAddresses,
  statusesOfOrders,
  statusesOfOrderItems,
};
