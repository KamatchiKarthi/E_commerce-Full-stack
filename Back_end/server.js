const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const CartRoutes = require("./routes/cartRoutes");
const CheckOutRoutes = require("./routes/checkoutRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/upLoadRoutes");
const subscribeRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdmin = require("./routes/productAdminRoutes");
const orderAdmin = require("./routes/adminOrderRoutes");
app.use(express.json());
app.use(
  cors({
    origin: FRONT_END_URL,
  })
);

dotenv.config();

const PORT = process.env.PORT || 3000;

//coonect db
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome To Ocean API");
});

// APi Routes
app.use("/api/users", userRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckOutRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

//admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdmin);
app.use("/api/admin/orders", orderAdmin);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
