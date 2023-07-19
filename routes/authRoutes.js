const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login user and generate JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
