const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide every fields!!!" });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          message: "User not found!!! Please proceed to registration",
        });
        return;
      }

      const comparedPassword = await bcrypt.compare(password, user.password);
      if (!comparedPassword) {
        return res
          .status(404)
          .json({ message: "Invalid email or password!!!!" });
      }

      const genToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
      };
      const token = genToken(user._id);

      return res
        .cookie("token", token, { httpOnly: true, sameSite: "strict" })
        .status(200)
        .json({ message: "Login successfully!!!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = signIn;
