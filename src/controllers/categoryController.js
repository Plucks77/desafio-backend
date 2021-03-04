const knex = require("../database/connection");

class CategoryController {
  async all(req, res) {
    try {
      const categories = await knex.select("*").from("category");
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = CategoryController;
