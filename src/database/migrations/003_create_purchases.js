exports.up = async function (knex) {
  return await knex.schema.createTable("purchase", (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("user").unsigned();
    table.integer("installment").notNullable();
    table.float("total").notNullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("purchase");
};
