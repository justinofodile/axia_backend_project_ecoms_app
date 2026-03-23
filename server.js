require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRoutes");
const productRouter = require("./routers/productRoutes");
const categoryRouter = require("./routers/categoryRouter");
const cookieParser = require("cookie-parser");
const cartRouter = require("./routers/cartRoutes");
const orderRouter = require("./routers/orderRoutes");
connectDB();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/user", authRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/carts", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`App listerning on port ${port}`);
});
