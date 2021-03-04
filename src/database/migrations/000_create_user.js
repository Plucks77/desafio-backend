exports.up = async function (knex) {
  return await knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("name", 150).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("password", 150).notNullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("user");
};
