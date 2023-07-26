const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Register a new user
router.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Register a new vendor
router.post("/vendor/register", async (req, res) => {
  const { name, email, password, category, balance } = req.body;
  try {
    const vendor = await authService.registerVendor(
      name,
      email,
      password,
      category,
      balance
    );
    res.status(201).json({ message: "User registered successfully", vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login user and generate JWT token
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid email or password" });
  }
});
// Login vendor and generate JWT token
router.post("/vendor/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginVendor(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
