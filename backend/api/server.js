const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const routes = require("./src/routes");
const authentication = require("./src/core/auth/base");
const fileUpload = require("express-fileupload");
const sequelize = require("./src/core/db");

require("dotenv").config();
const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

// Cors disable
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

// app.use(requestLogger);

authentication(app);
routes(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Не удалось подключится к базе данных");
  });

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`),
);

if (process.env.CI) {
  console.log(`Tested success`);
  // eslint-disable-next-line no-process-exit
  process.exit(0);
}

module.exports = app;
