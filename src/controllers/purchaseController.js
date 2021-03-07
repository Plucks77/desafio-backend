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
      .select("*")
      .from("purchase")
      .where("user_id", "=", user_id);

    // for (let i = 0; i < purchases.length; i++) {
    //   const prod = await knex
    //     .select("product_id")
    //     .from("purchase_products")
    //     .where("purchase_id", "=", purchases[i].id);

    //   purchases.push(prod);
    //   console.log(prod);
    // }
    // let ret = [
    //   {
    //     purchase_id: "",
    //     installment: "",
    //     total: "",
    //     products: [
    //       {
    //         name: "",
    //         image_url: "",
    //         amount: "",
    //         obs: "",
    //       },
    //     ],
    //   },
    // ];
    // // let ret = [];
    // let counter = 0;
    // purchases.forEach(async (purchase) => {
    //   ret[counter] = {
    //     purchase_id: purchase.id,
    //     installment: purchase.installment,
    //     total: purchase.total,
    //   };
    //   const pp = await knex
    //     .select("*")
    //     .from("purchase_products")
    //     .where("purchase_id", "=", purchase.id);

    //   pp.forEach(async (pprod) => {
    //     const prod = await knex
    //       .select("*")
    //       .from("product")
    //       .where("id", "=", pprod.product_id);
    //     ret[counter].products.push({
    //       name: prod.name,
    //       image_url: prod.image_url,
    //       amount: pprod.amount,
    //       obs: pprod.observation,
    //     });
    //   });
    //   counter++;
    // });

    // console.log(ret);

    const purchases2 = await knex("purchase")
      .join("purchase_products", "purchase.id", "purchase_products.purchase_id")
      .join("product", "purchase_products.product_id", "product.id")
      .select(
        "purchase.id",
        "purchase_products.amount",
        "purchase_products.observation",
        "purchase.installment",
        "purchase.total",
        "product.name"
      )
      .where({ user_id: user_id });

    return res.json(purchases);
  }
}

module.exports = PurchaseController;
