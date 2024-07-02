//part of the shop that the user sees

const adminData = require("./admin");
const path = require("path");
//path is a core module used to import files with their relative path
//__dirname is a global variable that gives the absolute path of the current file of our prohect folder
// const path = require("path");

// const rootDir = require("../util/path");

const shopController = require("../controllers/shop");
const express = require("express");

const router = express.Router();

router.get("/", shopController.getApp);

router.get("/orders", shopController.getOrders);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.post("/add-to-cart", shopController.postCart);

router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.post("/create-order", shopController.postOrders);

module.exports = router;
