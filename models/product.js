//represents a single  entity
const fs= require('fs');
const path= require('path');
const products = [];

module.exports = class Product {
  constructor(title, imageUrl,price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    // const p = path.join(path.dirname(require.main.filename),'data');
    products.push(this);
  }

  static fetchAll() {
    return products;  //the products array is returned
  }
};
