const knex = require("../database/connection");

class CategoryController {
  async all(req, res) {
    try {
      const categories = await knex.raw(
        "SELECT c.id, c.name , (SELECT Count(*)  FROM product b Where b.category_id = c.id ) as amount FROM  category c"
      );

      return res.json(categories[0]);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = CategoryController;
