const knex = require("knex");
exports.seed = async function (knex) {
  return await knex("product").insert([
    {
      category_id: 1,
      name: "Café",
      price: 10,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
    },
    {
      category_id: 1,
      name: "Cappuccino",
      price: 15.3,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/A_cappuccino.jpg",
    },
    {
      category_id: 1,
      name: "Mocha",
      price: 20,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mocha_coffee.jpg",
    },
    {
      category_id: 2,
      name: "Brownie",
      price: 15,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Chocolate_brownie_with_a_scoop_of_icecream_from_Gowlett%2C_Peckham%2C_London.jpg",
    },
    {
      category_id: 2,
      name: "Cookie",
      price: 12,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/5/50/Chocolate_chip_cookies.jpg",
    },
    {
      category_id: 2,
      name: "Barra de chocolate",
      price: 11.9,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cadbury-Dairy-Milk-Caramel-Bar.jpg",
    },
  ]);
};
