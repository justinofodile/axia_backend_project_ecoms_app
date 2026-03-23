const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  updateOrderById,
} = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const orderRouter = express.Router();

// Router to create task
orderRouter
  .post("/create", authMiddleware, createOrder)

  // Router to get all task by user
  .get("/getAllOrder", adminMiddleware, getAllOrders)

  // Router to update task by user
  .put("/updateOrder", adminMiddleware, updateOrderById);

//   // Router to delete task by user
//   .delete("/deleteProduct/:id", adminMiddleware, deleteProductByID);

module.exports = orderRouter;
