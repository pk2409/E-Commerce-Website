//adding a user , which has their own cart

const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define("user", {
  //storing it in the user constant
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = User;