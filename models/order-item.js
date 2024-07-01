const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const OrderItem = sequelize.define("orderItem", {
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
module.exports = OrderItem;
