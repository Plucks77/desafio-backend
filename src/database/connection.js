const knex = require("knex");
require("dotenv").config();

const connectionSettings = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

const connection = knex({
  client: process.env.DB_CLIENT,
  connection: connectionSettings,
  useNullAsDefault: true,
});

module.exports = connection;
