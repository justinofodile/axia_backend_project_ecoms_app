const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({ message: "All fields are required!!!" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist!!! Try login in" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully!!!", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAllUser = async (req, res) => {
  const user = await User.find();

  try {
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({
      message: user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId, admin } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: `No order with the id of ${userId}`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { admin },
      { new: true },
    );
    if (!updatedUser)
      return res.status(401).json({
        message: `Unable to update any user!!! No user with the id of ${userId}`,
      });
    res
      .status(200)
      .json({ message: "User updated successfully!!!", date: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = { createUser, findAllUser, updateUserById };
