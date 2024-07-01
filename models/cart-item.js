const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});
//id of the product and quantity of the product which will be related to the cart it is in and the product details that it has
module.exports = CartItem;
