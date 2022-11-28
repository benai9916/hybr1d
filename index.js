const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// local import
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");
const buyerRoute = require("./routes/buyerRoute");
const sellerRoute = require("./routes/sellerRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("I am alive");
});

app.use("/api/auth", authRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/buyer", buyerRoute);
