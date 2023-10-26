const { Client } = require("pg");
// eslint-disable-next-line node/no-unpublished-require
require("dotenv").config({ path: "../../.env" });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST_IP,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const down = async () => {
  try {
    await client.connect();
    await client.query("DROP DATABASE " + process.env.DB_DATABASE_TEST); // sends queries
  } catch (e) {
    console.log(e);
  }

  await client.end();
  return;
};

down().then(() => {
  console.log("Success");
});
