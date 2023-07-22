const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/model");
const { json } = require("sequelize");

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = generateToken(user);
  const res = {
    token,
    expIn: "1",
  };

  return { token, expiresIn: "1h" };
};

module.exports = { registerUser, loginUser };
