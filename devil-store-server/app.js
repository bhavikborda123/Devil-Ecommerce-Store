const express = require("express");
require("dotenv").config();

const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

// const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const CreateAllFolder = require("./config/uploadFolderCreateScript");

const { ConnectToDB } = require("./config/db");

// Import Routes
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const resetPasswordRouter = require("./routes/reset-password");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const customizeRouter = require("./routes/customize");
const razorpayRouter = require("./routes/razorpay");

// Create All Uploads Folder if not exists | For Uploading Images
CreateAllFolder();

// Create app
const app = express();

// Database Connection
ConnectToDB();

// Use Middleware
// app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/reset-password", resetPasswordRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);
app.use("/api/razorpay", razorpayRouter);

app.get("/api/orders", (req, res) => {
  const { startDate, endDate } = req.query;
  const filteredOrders = orders.filter(
    (order) =>
      order.createdAt >= new Date(startDate) &&
      order.createdAt <= new Date(endDate)
  );
  res.json({ orders: filteredOrders });
});

// Creating https server
const PORT = process.env.PORT;

// const server = https.createServer(options, app);

app.listen(parseInt(PORT), () => {
  console.log("Server is running on", process.env.API_URL);
});
