const Statuses = require("../enums/statuses");

const allStatuses = [...Object.values(Statuses)];

const statusesOfAddresses = [...allStatuses];
const statusesOfCatalogs = [...allStatuses];

module.exports = {
  allStatuses,
  statusesOfCatalogs,
  statusesOfAddresses,
};
