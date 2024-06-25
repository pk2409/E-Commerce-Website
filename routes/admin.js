//creation and deletion of the products of the shop

const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();
//router here is used to create a mini express app that can be used in the main express app

const products=[];


// router.get("/add-product", (request, response, next) => {
//   // response.send(
//   //   '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   // );
//   response.sendFile(path.join(rootDir, "views", "add-product.html"));
// });

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.post("/add-product", (request, response, next) => {
  console.log(request.body);
  products.push({title: request.body.title,
    price: request.body.price,
    description: request.body.description,
  })
  response.redirect("/");
});
//adminData is all the exports from this file
exports.routes=router;
exports.products=products;
