const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product.ejs", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.getEditProduct = (request, response, next) => {
  const editMode = request.query.edit; //this is the query string that we have in the url
  //it is always passed as string , so "true" instead of true

  if (!editMode) {
    return response.redirect("/");
  }
  const prodId = request.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return response.redirect("/");
      }
      response.render("admin/edit-product", {
        // path: "/admin/edit-product/",
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode, //if this is the product id to be edited
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return response.redirect("/");
  //   }
  //   response.render("admin/edit-product", {
  //     path: "/admin/edit-product",
  //     pageTitle: "Edit Product",
  //     editing: editMode, //if this is the product id to be edited
  //     product: product,
  //   });
  // });
};

exports.postEditProduct = (request, response, next) => {
  //fetch info for the product
  //new values
  const prodId = request.body.productId; //productId remains the same
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedImageUrl = request.body.imageUrl;
  const updatedDescription = request.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedPrice,
  //   updatedDescription
  // );
  // updatedProduct.save();
  // response.redirect("/admin/products");
  Product.findByPk(prodId)

    .then((product) => {
      console.log("Product ID:", prodId);
      if (!product) {
        return response.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      response.redirect("/admin/products");
    })
    .catch((err) => console.log(err)); //will catch errors for both the promises
};

exports.postAllProducts = (request, response, next) => {
  const title = request.body.title;
  const price = request.body.price;
  const description = request.body.description;
  const imageUrl = request.body.imageUrl;
  const product = new Product(null, title, imageUrl, price, description);
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log("Product Created");
      response.redirect("/admin/products")
    })
    .catch((err) => {
      console.log(err);
    });

  // -------------------------------------> CODE FOR USING MYSQL WITHOUT SEQUELIZE <----------------------------------------------
  // product
  //   .save()
  //   .then(() => {
  //     //only redirect once the insert is completed
  //     response.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(request.body);
  // products.push({
  //   title: request.body.title,
  //   price: request.body.price,
  //   description: request.body.description,
  // });
  // response.redirect("/");
};

exports.getProducts = (request, response, next) => {
  // const products = Product.fetchAll();

  // response.render("admin/products", {
  //   path: "/admin/products",
  //   prods: products,
  //   pageTitle: "Admin Products",
  // });
  Product.findAll()
    .then((products) => {
      response.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DELETED PRODUCT");
      response.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
