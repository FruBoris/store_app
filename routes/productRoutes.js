const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticateToken } = require("../middleware/authMware");

// Get all products
router.get("/", authenticateToken, async (req, res) => {
  await getAllProducts(req, res);
});

// Get a specific product
router.get("/:id", authenticateToken, async (req, res) => {
  await getProductById(req, res);
});

// Create a new product
router.post("/", authenticateToken, async (req, res) => {
  await createProduct(req, res);
});

// Update a product
router.put("/:id", async (req, res) => {
  await updateProduct(req, res);
});

// Delete a product
router.delete("/:id", authenticateToken, async (req, res) => {
  await deleteProduct(req, res);
});

module.exports = router;
