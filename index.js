const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const userIdMiddleware = require("./services/uuid");
const axios = require("axios");
const cors = require("cors");
require("./models/user");
require("./models/cart");
require("./models/usercart");

const app = express();
app.use(cookieParser());
app.use(userIdMiddleware);
app.use(express.json()); // Middleware to parse JSON bodies
mongoose.connect(keys.mongoURI);

app.get("/", (req, res) => {
  const userId = req.userId;
  res.send({ userId });
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.post("/api/test", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status("success");
});

app.post("/api/payment", (req, res) => {
  const paymentData = req.body;
  console.log(paymentData);

  axios
    .post("https://payments.yoco.com/api/checkouts", {
      paymentData,
    })
    .then((response) => {
      const { id, redirectUrl, status, amount, currency, metadata } =
        response.data;
      console.log(redirectUrl);
      res.status(response.data);
    })
    .catch((error) => {
      console.error("error", error);
    });
});

app.post("/api/add", (req, res) => {
  const cartArray = req.body;
  res.status("success");
  const Cart = mongoose.model("Cart");
  new Cart({
    price: cartArray[0].price,
    colour: cartArray[0].colour,
    quantity: cartArray[0].quantity,
  }).save();
});
app.post("/api/addUser", (req, res) => {
  const data = req.body;
  const Usercart = mongoose.model("Usercart");

  console.log(data.cartUser);
  new Usercart({
    name: data.name,
    email: data.email,
    number: data.number,
    address: data.address,
    city: data.city,
    zip: data.zip,
    userCart: data.cartUser,
  }).save();
});

//below code handles Route handling in React app
if (process.env.NODE_ENV === "production") {
  //express will serve production assets
  app.use(express.static("client/build"));
  //express will serve the index.html file
  // if it does not recognise the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
