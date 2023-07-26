const sequelize = require("../config/database");

const Product = require("../models/product");
const Cart = require("../models/cart");
const CartProduct = require("../models/cartProduct");
const User = require("../models/user");
const Vendor = require("./vendor");
const Payment = require("./payment");

// Define relationships between entities
User.hasMany(Cart); // A customer can have many carts
Cart.belongsTo(User); // A cart belongs to a single customer

Vendor.hasMany(Product);
Product.belongsTo(Vendor);

Cart.belongsToMany(Product, { through: CartProduct }); // A cart can contain many products, and a product can be in many carts
Product.belongsToMany(Cart, { through: CartProduct });

Payment.belongsTo(Cart);
Cart.hasOne(Payment);

// Might be deleted
Vendor.hasMany(Payment);
Payment.belongsTo(Vendor);

sequelize.sync();
module.exports = { Product, Cart, CartProduct, User, Vendor, Payment };
