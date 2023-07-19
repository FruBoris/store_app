const User = require("../models/user");
const Product = require("../models/product");

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the product by productId
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product has adequate quantity
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient product quantity" });
    }

    // Add the productId to the user's cart array
    user.cart.push(productId);

    // Save the user with the updated cart
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId, {
      include: [{ model: Product, attributes: ["id", "name", "price"] }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
  }
};

// Update the quantity of a product in the cart
exports.updateCartItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is in the user's cart
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Find the product by productId
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product has adequate quantity
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient product quantity" });
    }

    // Update the quantity in the user's cart array
    user.cart[index] = productId;

    // Save the user with the updated cart
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart item quantity" });
  }
};

// Remove a product from the cart
exports.removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is in the user's cart
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Remove the product from the cart array
    user.cart.splice(index, 1);

    // Save the user with the updated cart
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Clear the cart array
    user.cart = [];

    // Save the user with the cleared cart
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

// Buy the products in the cart
exports.buyCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findByPk(userId, {
      include: [
        { model: Product, attributes: ["id", "name", "price", "quantity"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const productsInCart = await Product.findAll({
      where: { id: user.cart },
    });

    // Check if the products in the cart are available in sufficient quantity
    for (const product of productsInCart) {
      const quantityInCart = user.cart.filter((id) => id === product.id).length;
      if (product.quantity < quantityInCart) {
        return res
          .status(400)
          .json({ error: `Insufficient quantity for product ${product.name}` });
      }
    }

    // Update the product quantity in the store and remove bought products from the cart
    await Promise.all(
      productsInCart.map(async (product) => {
        const quantityInCart = user.cart.filter(
          (id) => id === product.id
        ).length;
        product.quantity -= quantityInCart;
        await product.save();
        user.cart = user.cart.filter((id) => id !== product.id);
      })
    );

    // Save the user with the updated cart
    await user.save();

    res.json({ message: "Purchase successful" });
  } catch (err) {
    res.status(500).json({ error: "Failed to buy cart" });
  }
};
