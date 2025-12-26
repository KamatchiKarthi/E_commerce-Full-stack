const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const CartRoutes = require("./routes/cartRoutes");
const CheckOutRoutes = require("./routes/checkoutRoutes");

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//coonect db
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome To Ocean API");
});

// APi Routes
app.use("/api/users", userRoutes);
app.use("/api/produts", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckOutRoutes);
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
