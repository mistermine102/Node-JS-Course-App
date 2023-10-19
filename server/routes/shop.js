const express = require("express");

const productsController = require("../controllers/products");
const cartController = require("../controllers/cart")
const { checkout, getOrders } = require("../controllers/shop");
const isLogged = require("../middleware/isLogged")

const router = express.Router();

router.get("/products", productsController.getProducts);
router.get("/product/details/:id", productsController.getProduct)  

router.get("/cart", isLogged, cartController.getCart);
router.post("/cart", isLogged, cartController.addItem)
router.post("/cart/remove/:id", isLogged, cartController.removeItem)   

router.get("/orders", isLogged, getOrders)
router.post("/checkout", isLogged, checkout)

module.exports = router;
