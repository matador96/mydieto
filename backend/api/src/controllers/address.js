const { query } = require("express-validator");
const AddressesService = require("../services/addresses");
const { ApplicationError } = require("../classes/Errors");

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

module.exports.getById = async (req) => {
  const { id } = req.params;
  const address = await AddressesService.getById(id);

  return { data: address };
};

module.exports.getWithParams = async (req) => {
  const result = await AddressesService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const addressData = {
    ...req.body,
  };
  const data = await AddressesService.create(addressData, { transaction });

  // userLogger(
  //   loggerActions.CREATE_SELLER,
  //   {
  //     dataFromRequest: sellerData,
  //     result: data,
  //   },
  //   req,
  // );

  return {
    data,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;

  const address = await AddressesService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  // userLogger(
  //   loggerActions.UPDATE_SELLER,
  //   {
  //     dataFromRequest: { ...req.body, id: sellerData.id },
  //     result: sellerData,
  //   },
  //   req,
  // );

  return {
    data: address,
  };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  const result = await AddressesService.getWithParams({
    routeId: id,
  });

  if (result.count > 0) {
    throw new ApplicationError(
      "Невозможно удалить, так как у маршрута есть заявки, уберите их",
      {
        path: "controller",
      },
    );
  }

  await AddressesService.deleteById(id, { transaction });

  // userLogger(
  //   loggerActions.DELETE_ROUTE,
  //   {
  //     dataFromRequest: { id },
  //     result: { id },
  //   },
  //   req,
  // );

  return {};
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
