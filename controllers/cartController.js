const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const user = req.user.id;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({
        user,
        items: [{ product, quantity }],
      });
      await cart.save();
    } else {
      cart.items.push({ product, quantity });
      await cart.save();
    }
    res.status(200).json({ message: cart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to get all carts by user
const getAllCarts = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate(
      "user",
      "-password",
    );
    if (!cart)
      return res
        .status(404)
        .json({ message: "Unable to get a cart. No cart available" });
    res.status(200).json({ message: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCart, getAllCarts };
