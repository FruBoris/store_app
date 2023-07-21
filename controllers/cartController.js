const { Product, User, Cart, CartProduct } = require("../models/model");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

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

    // Find or create the cart for the user
    const [cart, created] = await Cart.findOrCreate({
      where: {
        UserId: userId,
      },
    });

    // Check if the product is already in the cart
    const cartProduct = await CartProduct.findOne({
      where: {
        CartId: cart.id,
        ProductId: product.id,
      },
    });

    // Check if the product has adequate quantity
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient product quantity" });
    }

    if (cartProduct) {
      // If the product is already in the cart, update the quantity

      // reduce the product from store
      product.quantity -= quantity;
      await product.save();
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      // Otherwise, add the product to the cart with the specified quantity
      await cart.addProduct(product, { through: { quantity } });
    }
    // Save the user with the updated cart
    // await user.save();

    res.json({ cart, cartProduct, product });
  } catch (err) {
    console.log(err);
    // const cart = (await Cart.findAll()).toString();
    // console.log(cart);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    // const user = await User.findByPk(userId, {
    //   include: [{ model: Product, attributes: ["id", "name", "price"] }],
    // });
    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: Product,
    });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart.Products);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
    console.log(err);
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
