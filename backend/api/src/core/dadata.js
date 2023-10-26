const Dadata = require("dadata-suggestions");
const { ApplicationError } = require("./../classes/Errors");
const { AnotherServiceError } = require("./../classes/Errors");
require("dotenv").config();

const dadata = new Dadata(process.env.DADATA_TOKEN);

const getSuggestionsOfAddress = async (address, count = 1) => {
  try {
    const suggestionsObj = await dadata.address({
      query: address,
      // locations: [{ region: "Москва" }, { region: "Московская" }],
      count: count,
    });

    return suggestionsObj;
  } catch (e) {
    throw new AnotherServiceError(e.message);
  }
};

const getAddressInfo = async (address) => {
  const data = await getSuggestionsOfAddress(address);

  if (!data)
    throw new ApplicationError("Нет адресов", {
      path: "core",
    });

  const addressObj = data.suggestions[0].data;

  return addressObj;
};

module.exports = {
  getAddressInfo,
  getSuggestionsOfAddress,
};
