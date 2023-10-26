const { exec } = require("child_process");
const { Client } = require("pg");
require("dotenv").config({ path: "../../.env" });
// eslint-disable-next-line node/no-unpublished-require

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST_IP,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const up = async () => {
  try {
    await client.connect();
    await client.query("CREATE DATABASE " + process.env.DB_DATABASE_TEST); // sends queries
  } catch (e) {
    console.log("Возникла ошибка или база данных уже существует");
    // console.log(e);
  }

  exec(
    `db-migrate up --config database.json -m ../../migrations -e test`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    },
  );

  await client.end();
};

up().then((result) => {
  if (result) {
    console.log("Database is updated");
  }
});
