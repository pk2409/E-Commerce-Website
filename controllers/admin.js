const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/add-product.ejs", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAllProducts = (request, response, next) => {
  const product = new Product(
    request.body.title,
    request.body.price,
    request.body.description
  );
  product.save();
  // console.log(request.body);
  // products.push({
  //   title: request.body.title,
  //   price: request.body.price,
  //   description: request.body.description,
  // });
  response.redirect("/");
};

exports.getProducts = (request, response, next) => {
  const products = Product.fetchAll();

  response.render("admin/products", {
    path: "/admin/products",
    prods: products,
    pageTitle: "Admin Products",
  });
};
