const express = require("express");
const UserController = require("./controllers/userController");
const CategoryController = require("./controllers/categoryController");
const ProductController = require("./controllers/productController");
const AuthMiddleware = require("./middlewares/auth");

const routes = express.Router();
const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();

routes.post("/user/register", userController.register);

routes.post("/user/login", userController.login);

routes.get("/categories", AuthMiddleware, categoryController.all);
routes.get("/products", AuthMiddleware, productController.all);

module.exports = routes;
