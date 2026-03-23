const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCart, getAllCarts } = require("../controllers/cartController");

const cartRouter = express.Router();

// Router to create task
cartRouter
  .post("/create", authMiddleware, createCart)

  // Router to get all task by user
  .get("/getAllCart", authMiddleware, getAllCarts);

//   // Router to update task by user
//   .put("/updateProduct/:id", adminMiddleware, updateProductByID)

//   // Router to delete task by user
//   .delete("/deleteProduct/:id", adminMiddleware, deleteProductByID);

module.exports = cartRouter;
