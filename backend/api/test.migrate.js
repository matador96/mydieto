const { exec } = require("child_process");
const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const testDatabaseName = "test_migrate";

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST_IP,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createDatabase = async () => {
  const dropDatabaseAndCloseConnect = async () => {
    await client.query("DROP DATABASE IF EXISTS " + testDatabaseName); // sends queries
    await client.end();
  };

  try {
    await client.connect(); // gets connection
    await client.query("DROP DATABASE IF EXISTS " + testDatabaseName);
    await client.query("CREATE DATABASE " + testDatabaseName); // sends queries

    exec("npm run migrate-test", async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      await dropDatabaseAndCloseConnect();
      console.log(`stdout: ${stdout}`);
    });

    return true;
  } catch (error) {
    console.error(error.stack);
    await dropDatabaseAndCloseConnect();
    return false;
  }
};

createDatabase().then((result) => {
  if (result) {
    console.log("Database created");
  }
});
