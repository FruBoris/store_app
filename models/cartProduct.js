const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CartProduct = sequelize.define("CartProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = CartProduct;
