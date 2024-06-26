//for all logic related to products
//all the data that we manipulate or work on is done here

//import our class now
const Product = require("../models/product");

exports.getProducts = (request, response, next) => {
  // response.sendFile(path.join(rootDir, "views", "shop.html")); // we do not add / , path join creates a path that works in all OS

  const products = Product.fetchAll();

  response.render("shop/product-list", {
    path: "/",
    prods: products,
    pageTitle: "Shop",
  });
};

exports.getApp = (request, response, next) => {
  const products = Product.fetchAll();

  response.render("shop/app", {
    path: "/",
    prods: products,
    pageTitle: "Shop",
  });
};

exports.getCart = (request, response, next) => {
  response.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
