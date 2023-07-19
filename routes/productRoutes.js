const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
// Get all products
router.get("/", async (req, res) => {
  await getAllProducts(req, res);
});

// Get a specific product
router.get("/:id", async (req, res) => {
  await getProductById(req, res);
});

// Create a new product
router.post("/", async (req, res) => {
  await createProduct(req, res);
});

// Update a product
router.put("/:id", async (req, res) => {
  await updateProduct(req, res);
});

// Delete a product
router.delete("/:id", async (req, res) => {
  await deleteProduct(req, res);
});

module.exports = router;
