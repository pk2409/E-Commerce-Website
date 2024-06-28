// //represents a single  entity
// // const fs = require("fs");
// // const path = require("path");
// const products = [];
// const db = require("../util/db");

// //import cart model in product model to implement deletion of products
// const Cart = require("./cart");

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     //if id already exists(in case of update) or if it doesnt exist and it is null initially , then math.random creates an id for us
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     // const p = path.join(path.dirname(require.main.filename),'data');
//     return db.execute(
//       "INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id) {}

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id= ?", [id]); //to check if it is the id that we are getting as parameter here
//   }
// };

const Sequelize = require("sequelize"); //the Sequelize library

const sequelize = require("../util/db"); //the instance of Sequelize that we import from the connection we made in db.js

//defining model managed by sequelize
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
