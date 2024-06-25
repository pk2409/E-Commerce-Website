//creation and deletion of the products of the shop

const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();
//router here is used to create a mini express app that can be used in the main express app

router.get("/add-product", (request, response, next) => {
  // response.send(
  //   '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  // );
  response.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (request, response, next) => {
  console.log(request.body);
  response.redirect("/");
});

module.exports = router;
