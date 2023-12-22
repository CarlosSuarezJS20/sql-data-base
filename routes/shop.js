const express = require("express");

const shopController = require("../controllers/shop");
const cartController = require("../controllers/cart");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductById);

router.get("/cart", cartController.getCart);

router.post("/cart", cartController.postCart);

router.post("/cart-delete-item", cartController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
