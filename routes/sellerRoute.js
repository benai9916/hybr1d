const express = require("express");
const sellerService = require("../service/sellerService");
const auth = require("../middleware/authroize");
const userType = require("../middleware/userType");

const sellerRoute = express.Router();
sellerRoute.use(auth);
sellerRoute.use(userType("seller"));

sellerRoute.post("/create-catalog", sellerService.createCatalog);
sellerRoute.get("/:sellerId/get-catalog", sellerService.getCatalog);
sellerRoute.get("/orders", sellerService.getOrder);

module.exports = sellerRoute;
