const Cart = require("../models/Cart");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    let total = 0;
    cart.items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    const order = new Order({
      user,
      items: cart.items,
      totalAmount: total,
    });
    await order.save();
    res.status(200).json({ message: order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to get all task
const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate("user", "-password")
      .populate("items.product");
    if (!order)
      return res
        .status(404)
        .json({ message: "Unable to get a order. No order available" });
    res.status(200).json({ message: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: `No order with the id of ${orderId}`,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!updatedOrder)
      return res.status(401).json({
        message: `Unable to update any order!!! No order with the id of ${orderId}`,
      });
    res
      .status(200)
      .json({ message: "Order updated successfully!!!", date: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderById };
