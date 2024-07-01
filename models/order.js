const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
});
//id of the product and quantity of the product which will be related to the cart it is in and the product details that it has
module.exports = Order;
