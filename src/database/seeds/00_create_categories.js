const knex = require("knex");
exports.seed = async function (knex) {
  return await knex("category").insert([
    { name: "Bebidas" },
    { name: "Doces" },
  ]);
};
