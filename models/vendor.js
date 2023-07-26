const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vendor = sequelize.define("Vendor", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  category: DataTypes.STRING,
  balance: DataTypes.FLOAT,
});

module.exports = Vendor;
