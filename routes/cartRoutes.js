const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add a product to the cart
router.post("/cart/add", cartController.addToCart);

// Get the user's cart
router.get("/cart/:userId", cartController.getCart);

// Update the quantity of a product in the cart
router.put("/cart/update", cartController.updateCartItemQuantity);

// Remove a product from the cart
router.delete("/cart/remove", cartController.removeCartItem);

// Clear the entire cart
router.delete("/cart/clear/:userId", cartController.clearCart);

router.post("/cart/buy/:userId", cartController.buyCart);

module.exports = router;
