//for all logic related to products
//all the data that we manipulate or work on is done here

//import our class now
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (request, response, next) => {
  Product.findAll()
    .then((products) => {
      response.render("shop/product-list", {
        path: "/",
        prods: products, //the products fetched from the database
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //-----------------> CODE FOR MYSQL <-----------------
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     response.render("shop/product-list", {
  //       path: "/products",
  //       prods: rows,
  //       pageTitle: "Products List",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProduct = (request, response, next) => {
  const prodId = request.params.productId; // as we use productId after the colon

  Product.findByPk(prodId) //it fetches a product by its id that returns the product in form of an array
    .then((product) => {
      //array not returned by sequelize
      response.render("shop/product-detail", {
        product: product, //the product is stored as the only element of an array , as it was passed as an array
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //-------------------------------------------------------------------------------
  // Product.findById(prodId) //it fetches a product by its id that returns the product in form of an array
  //   .then(([product]) => {
  //     response.render("shop/product-detail", {
  //       product: product[0], //the product is stored as the only element of an array , as it was passed as an array
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
  Product.findAll()
    .then((products) => {
      response.render("shop/app", {
        path: "/",
        prods: products, //the products fetched from the database
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //----------------> CODE FOR MYSQL<--------------
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     response.render("shop/app", {
  //       path: "/",
  //       prods: rows, //the products fetched from the database
  //       pageTitle: "Shop",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
  const prodId = request.body.productId;
  product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    response.redirect("/cart");
  });
};

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
