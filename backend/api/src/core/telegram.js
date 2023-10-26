const fetch = require("node-fetch");
require("dotenv").config();

const API_URL = process.env.API_URL_TELEGRAM_BOT_SERVICE;
const API_KEY = process.env.API_KEY_TELEGRAM_BOT_SERVICE;

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "API_KEY": API_KEY,
};

const sendAuctionToTelegram = async (obj) => {
  const response = await fetch(`${API_URL}/api/v1/auction/start`, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  const data = result.data;
  return data;
};

const sendWinnerToTelegram = async (obj) => {
  const response = await fetch(`${API_URL}/api/v1/auction/winner`, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  const data = result.data;
  return data;
};

const sendCancelAuctionToTelegram = async (obj) => {
  const response = await fetch(`${API_URL}/api/v1/auction/cancel`, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  const data = result.data;
  return data;
};

module.exports = {
  sendAuctionToTelegram,
  sendWinnerToTelegram,
  sendCancelAuctionToTelegram,
};
