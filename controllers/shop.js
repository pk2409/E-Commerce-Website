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
  // const prodId = request.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // console.log(prodId);
  // response.redirect("/cart");
  const prodId = request.body.productId;
  let fetchedCart;
  let product;
  let newQuantity = 1;
  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity; //cartItem acts as a relation between these two tables and gives us access to the exact table it is related to
        newQuantity = oldQuantity + 1;

        return product;
      }
      return Product.findByPk(prodId); //setting the fields that should be set
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => response.redirect("/cart"))
    .catch((err) => {
      console.log(err);
    });
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
  // Cart.getCart((cart) => {
  //   product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartproductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartproductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData });
  //       }
  //     }
  //     response.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartProducts, //this is all sent to the view
  //     });
  //   });
  // });

  request.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          response.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products, //this is all sent to the view
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(cart);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      response.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
  // product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   response.redirect("/cart");
  // });
};

exports.getOrders = (request, response, next) => {
  request.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders);
      response.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        order: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

// exports.postOrder = (request, response, next) => {
//   let fetchedCart;
//   console.log("working here");
//   request.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       console.log("THIS WORKS");
//       //create order for a particular user
//       return request.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               console.log(product);
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(() => {
//       response.redirect("/orders");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.postOrders = (request, response, next) => {
  let fetchedCart;
  console.log("hello");
  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return fetchedCart.getProducts();
    })
    .then((products) => {
      console.log(products);
      return request.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      response.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
