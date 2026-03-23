const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  const jwtsecret = process.env.JWT_SECRET;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login or register to continue!!!" });
  }
  try {
    const verifiedToken = jwt.verify(token, jwtsecret);
    if (!verifiedToken) {
      return res.status(401).json({ message: "Invalid secret" });
    }

    const user = await User.findById(verifiedToken.id).select("-password");
    // console.log(user);
    // console.log(user.admin);
    if (!user) {
      return res.status(401).json({ message: "Invalid credential!!!" });
    }
    if (!user.admin) {
      return res
        .status(401)
        .json({ message: "Invalid credential! Admin only!!!" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
