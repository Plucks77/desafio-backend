const knex = require("../database/connection");

class PurchaseController {
  async store(req, res) {
    try {
      const purchase = req.body;

      const insertedPurchase = await knex("purchase").insert({
        user_id: purchase.user_id,
        installment: purchase.installment,
        total: purchase.total,
      });

      const purchase_id = insertedPurchase[0];

      await purchase.products.map(async (product) => {
        try {
          await knex("purchase_products").insert({
            purchase_id: purchase_id,
            product_id: product.id,
            amount: product.amount,
            observation: product.observation,
          });
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      });

      return res.json(purchase_id);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async purchases(req, res) {
    const user_id = req.params.id;

    const purchases = await knex
      .select(["purchase.id", "purchase.installment", "purchase.total"])
      .from("purchase")
      .count("purchase_products.id as items")
      .join("purchase_products", "purchase_products.purchase_id", "purchase.id")
      .where("user_id", "=", user_id)
      .groupBy("purchase.id");

    return res.json(purchases);
  }

  async purchasesProducts(req, res) {
    const purchase_id = req.params.id;
    const pp = await knex.raw(
      `select pp.purchase_id ,pp.product_id, pp.amount, pp.observation, p.name , p.image_url from purchase_products pp join product p where p.id = pp.product_id and pp.purchase_id = ${purchase_id};`
    );
    return res.json({ products: pp[0] });
  }
}

module.exports = PurchaseController;
