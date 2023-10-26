const { query } = require("express-validator");

const pagination = [
  query("limit").isInt({ min: 1 }).optional(),
  query("page").isInt({ min: 1 }).optional(),
];

const sorting = [
  query("sort").isString().optional(),
  query("order").isString().isIn(["asc", "desc"]).optional(),
];

module.exports = {
  pagination,
  sorting,
};
