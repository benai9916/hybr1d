const express = require("express");
const buyerService = require("../service/buyerService");
const auth = require("../middleware/authroize");
const userType = require("../middleware/userType");

const buyerRoute = express.Router();
buyerRoute.use(auth);
buyerRoute.use(userType("buyer"));

buyerRoute.get("/list-of-sellers", buyerService.sellerList);
buyerRoute.get("/seller-catalog/:sellerId", buyerService.sellerCatalogById);
buyerRoute.post("/create-order/:sellerId", buyerService.placeOrder);
buyerRoute.get("/get-order/:buyerId", buyerService.getOrder);

module.exports = buyerRoute;
