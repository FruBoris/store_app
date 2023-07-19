const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CartProduct = sequelize.define("CartProduct", {});

module.exports = CartProduct;
