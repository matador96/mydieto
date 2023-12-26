const Statuses = require("../enums/statuses");

const allStatuses = [...Object.values(Statuses)];

const statusesOfAddresses = [...allStatuses];
const statusesOfAdmins = [...allStatuses];
const statusesOfCatalogs = [...allStatuses];
const statusesOfManagers = [...allStatuses];
const statusesOfOrders = [
  Statuses.EVALUATIVE_PRICE,
  Statuses.CONFIRM_PRICE,
  Statuses.WAITING_DELIVERY,
  Statuses.FINISHED,
  Statuses.CANCELED,
];
const statusesOfOrderItems = [...allStatuses];

module.exports = {
  allStatuses,
  statusesOfAddresses,
  statusesOfAdmins,
  statusesOfCatalogs,
  statusesOfManagers,
  statusesOfOrders,
  statusesOfOrderItems,
};
