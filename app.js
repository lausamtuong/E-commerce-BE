const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRoute.js");
app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const api = process.env.API_URL;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/product`, productRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "e-commerce",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
