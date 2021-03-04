exports.up = async function (knex) {
  return await knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table
      .integer("category_id")
      .references("id")
      .inTable("category")
      .unsigned();
    table.string("name", 150).notNullable();
    table.float("price").notNullable();
    table.string("image_url", 150).notNullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("product");
};
