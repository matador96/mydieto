const CryptoJS = require("crypto-js");

const passphrase = "agxc3ASG";

const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const encrypt64 = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt64 = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptWithAES,
  decryptWithAES,
  encrypt64,
  decrypt64,
};
