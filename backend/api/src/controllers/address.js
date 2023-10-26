const { query } = require("express-validator");
const AddressesService = require("../services/addresses");

module.exports.getAddressesWithSuggestions = async (req) => {
  let { count, address } = req.query;

  if (!count) {
    count = 10;
  }

  const suggestionsObj = await AddressesService.getSuggestions(address, count);
  const addresses = Array.from(
    suggestionsObj.suggestions,
    (suggestionAddress) => suggestionAddress.value,
  );

  return { data: addresses };
};

module.exports.validate = (method) => {
  switch (method) {
    case "getAddressesWithSuggestions": {
      return [query("address").exists(), query("count").isInt().optional()];
    }

    default:
      break;
  }
};
