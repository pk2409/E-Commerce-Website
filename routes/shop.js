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
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);

module.exports = router;
