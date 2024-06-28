const path = require("path");
const fs = require("fs");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    //fetch the previous cart
    // fs.readFile(p, (err, fileContent) => {
    //   let cart = { products: [], totalPrice: 0 };
    //   if (!err) {
    //     //cart already exists
    //     cart = JSON.parse(fileContent);
    //   }
    // });
    //see if the product is already there
    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, qty: 1 };
      cart.products = { ...cart.products, updatedProduct };
    }
    //add/increase the quantity
    cart.totalPrice = cart.totalPrice + +productPrice; //adding + infront of the productPrice to convert to integer
    fs.writeFile(p, JSON.stringify(cart), (err) => {
      console.log(err);
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        //if no cart, nothing to delete
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      if(!product){
        return;
      }
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter((prod) => prod !== id); //removing from the cart the product with prodid that is to be deleted over here
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fileContent.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    // fs.readFile(p, (err, fileContent) => {
    //   const cart = JSON.parse(fileContent);
    //   if (err) {
    //     cb(null);
    //   } else {
    //     cb(cart);
    //   }
    // });
  }
};
