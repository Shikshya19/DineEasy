require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth-router");
const connectDb = require("./utils/db");

const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
