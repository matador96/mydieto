const fs = require("fs");
const { readdir } = require("fs/promises");
const { getFileNameByDate, getToday } = require("../helpers/log");
const { ApplicationError } = require("../classes/Errors");

const dirs = {
  userLogging: "./logs",
  errorLogging: "./error-logs",
};

module.exports.getLogByDate = (date, type = "userLogging") => {
  if (!date) {
    date = getToday();
  }

  const fileName = getFileNameByDate(date, dirs[type]);
  let logList = [];

  try {
    const data = fs.readFileSync(fileName, "utf8").split("\n");
    for (const i in data) {
      if (data[i] !== "") {
        logList.push(JSON.parse(data[i]));
      }
    }
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
  } catch {
    throw new ApplicationError("Не существует такого лога", {
      path: "controller",
    });
  }

  return { data: logList.reverse() };
};

module.exports.getDates = async (type) => {
  const files = await readdir(dirs[type]);
  const logFiles = files.filter((file) => file.endsWith(".log"));
  const dates = logFiles.map((logFile) => logFile.slice(-14, -4));
  return dates;
};
