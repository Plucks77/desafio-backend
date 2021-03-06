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

  async findByCategoryId(req, res) {
    const category_id = req.params.id;
    if (category_id == "all") {
      try {
        const products = await knex.select("*").from("product");
        return res.json(products);
      } catch (e) {
        return res.status(500).json({
          error: error.message,
        });
      }
    } else {
      try {
        const products = await knex
          .select("*")
          .from("product")
          .where("product.category_id", "=", category_id);
        return res.json(products);
      } catch (e) {
        return res.status(500).json({
          error: error.message,
        });
      }
    }
  }
}

module.exports = ProductController;
