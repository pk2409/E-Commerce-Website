//creation and deletion of the products of the shop

const express = require("express");
const path = require("path");

const router = express.Router();
//router here is used to create a mini express app that can be used in the main express app
const adminController = require("../controllers/admin");

// router.get("/add-product", (request, response, next) => {
//   // response.send(
//   //   '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   // );
//   response.sendFile(path.join(rootDir, "views", "add-product.html"));
// });

router.get("/add-product", adminController.getAddProduct); //not implemented as a function , we just pass a reference to it over here

router.post("/add-product", adminController.postAllProducts);

router.get("/products", adminController.getProducts); //for seeing products through the admin login

router.get("/edit-product/:productid", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

//adminData is all the exports from this file
exports.routes = router;
// exports.products=products;
//no need to export products from here as that code is no longer here
