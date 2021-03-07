const express = require("express");
const UserController = require("./controllers/userController");
const CategoryController = require("./controllers/categoryController");
const ProductController = require("./controllers/productController");
const PurchaseController = require("./controllers/purchaseController");
const AuthMiddleware = require("./middlewares/auth");

const routes = express.Router();
const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();
const purchaseController = new PurchaseController();

routes.post("/user/register", userController.register);

routes.post("/user/login", userController.login);

routes.get("/categories", AuthMiddleware, categoryController.all);
routes.get("/products", AuthMiddleware, productController.all);
routes.get("/products/:id", AuthMiddleware, productController.findByCategoryId);

routes.post("/purchase", AuthMiddleware, purchaseController.store);
routes.get("/purchases/:id", AuthMiddleware, purchaseController.purchases);

routes.get("/hello", function (req, res) {
  console.log("world");
  return res.json("wolrd");
});

module.exports = routes;
