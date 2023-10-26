const strftime = require("strftime");

const getFileNameByDate = (date, dir) => {
  const fileName = `${dir}/application-${date}.log`;
  return fileName;
};

const getToday = () => {
  const now = strftime("%Y-%m-%d", new Date());
  return now;
};

module.exports = {
  getToday,
  getFileNameByDate,
};
