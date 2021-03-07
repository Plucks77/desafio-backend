exports.up = async function (knex) {
  return await knex.schema.createTable("purchase_products", (table) => {
    table.increments("id").primary();
    table
      .integer("purchase_id")
      .references("id")
      .inTable("purchase")
      .unsigned();
    table.integer("product_id").references("id").inTable("product").unsigned();
    table.integer("amount").notNullable();
    table.string("observation").notNullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("purchase_products");
};
