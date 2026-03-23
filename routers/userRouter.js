const express = require("express");
const {
  createUser,
  //   findAllUser,
  updateUserById,
} = require("../controllers/userController");
// const adminMiddleware = require("../middleware/adminMiddleware");

const userRouter = express.Router();

userRouter
  .post("/create", createUser)

  // Get all users
  //   .get("/getAllUser", adminMiddleware, findAllUser);
  //   .get("/getUser/:id", getUserByID)
  .put("/updateUser", updateUserById);
//   .delete("delete/:id", deleteUser);

module.exports = userRouter;
