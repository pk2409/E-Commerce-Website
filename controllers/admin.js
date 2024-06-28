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
  Product.findById(prodId, (product) => {
    if (!product) {
      return response.redirect("/");
    }
    response.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit Product",
      editing: editMode, //if this is the product id to be edited
      product: product,
    });
  });
};

exports.postEditProduct = (request, response, next) => {
  //fetch info for the product
  //new values
  const prodId = request.body.productId; //productId remains the same
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedImageUrl = request.body.imageUrl;
  const updatedDescription = request.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save();
  response.redirect("/admin/products");
};

exports.postAllProducts = (request, response, next) => {
  const title = request.body.title;
  const price = request.body.price;
  const description = request.body.description;
  const imageUrl = request.body.imageUrl;
  const product = new Product(null, title, imageUrl, price, description);
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

exports.postDeleteProduct=(request,response,next)=>{
  const prodId=request.body.productId;
  Product.deleteById(prodId);
  response.redirect('/admin/products');
}
