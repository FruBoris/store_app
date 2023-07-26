const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    amount: DataTypes.FLOAT,
    orderId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "payment",
  }
);
module.exports = Payment;
