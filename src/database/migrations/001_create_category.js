exports.up = async function (knex) {
  return await knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name", 150).notNullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("category");
};
