require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth-router");
const staffRoute = require("./routes/staff-router");
const tableRoute = require("./routes/table-router");
const bookingRoute = require("./routes/booking-router");
const menuRoute = require("./routes/menu-router");
const orderRoute = require("./routes/order-router");
const connectDb = require("./utils/db");

const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/table", tableRoute);
app.use("/api/menu", menuRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/orders", orderRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
