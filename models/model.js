const Product = require("../models/product");
const Cart = require("../models/cart");
const CartProduct = require("../models/cartProduct");
const User = require("../models/user");

// Define relationships between entities
User.hasMany(Cart); // A customer can have many carts
Cart.belongsTo(User); // A cart belongs to a single customer
Cart.belongsToMany(Product, { through: CartProduct }); // A cart can contain many products, and a product can be in many carts

module.exports = { Product, Cart, CartProduct, User };
