//for all logic related to products
//all the data that we manipulate or work on is done here

//import our class now
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (request, response, next) => {
  // response.sendFile(path.join(rootDir, "views", "shop.html")); // we do not add / , path join creates a path that works in all OS

  const products = Product.fetchAll();

  response.render("shop/product-list", {
    path: "/products",
    prods: products,
    pageTitle: "Products List",
  });
};

exports.getProduct = (request, response, next) => {
  const prodId = request.params.productId; // as we use productId after the colon
  Product.findById(prodId, (product) => {
    response.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
  response.redirect("/");
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  response.redirect("/cart");
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
  Cart.getCart((cart) => {
    product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartproductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartproductData) {
          cartProducts.push({ productData: product, qty: cartProductData });
        }
      }
      response.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts, //this is all sent to the view
      });
    });
  });
};

exports.postCartDeleteProduct = (request, response, next) => {
  const prodId=request.body.productId;
  product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price);
    response.redirect("/cart");
  });
}

exports.getOrders = (request, response, next) => {
  response.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
