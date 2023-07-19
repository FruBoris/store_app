const { Sequelize } = require("sequelize");

require("dotenv").config();
// create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

// test the connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));
//   .finally(() => sequelize.close());
module.exports = sequelize;
