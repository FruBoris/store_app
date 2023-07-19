const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add a product to the cart
router.post("/add", async (req, res) => {
  await cartController.addToCart(req, res);
});

// Get the user's cart
router.get("/:userId", cartController.getCart);

// Update the quantity of a product in the cart
router.put("/update", cartController.updateCartItemQuantity);

// Remove a product from the cart
router.delete("/remove", cartController.removeCartItem);

// Clear the entire cart
router.delete("/clear/:userId", cartController.clearCart);

router.post("/buy/:userId", cartController.buyCart);

module.exports = router;
