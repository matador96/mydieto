const fetch = require("node-fetch");

require("dotenv").config();
const API_URL = process.env.API_URL;

const updateObject = async (modelName, obj) => {
  const response = await fetch(`${API_URL}${modelName}/${obj.id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "API_KEY": process.env.API_KEY,
    },
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  const data = result.data;
  return data;
};

module.exports = {
  updateObject,
};
