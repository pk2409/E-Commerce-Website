//part of the shop that the user sees

const adminData = require("./admin");

//path is a core module used to import files with their relative path
//__dirname is a global variable that gives the absolute path of the current file of our prohect folder
const path = require("path");

const rootDir = require("../util/path");

const express = require("express");

const router = express.Router();

router.get("/", (request, response, next) => {
  const products = adminData.products;

  // response.sendFile(path.join(rootDir, "views", "shop.html")); // we do not add / , path join creates a path that works in all OS
  response.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
