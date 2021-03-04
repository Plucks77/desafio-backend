const knex = require("../database/connection");

class ProductController {
  async all(req, res) {
    try {
      const products = await knex.select("*").from("product");
      return res.json(products);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = ProductController;
