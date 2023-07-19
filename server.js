const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userController = require("./controllers/userController");
const sequelize = require("./config/database");
const cartRoutes = require("./routes/cartRoutes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.get("/users", userController.getAllUsers);
app.use("/carts", cartRoutes);

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
