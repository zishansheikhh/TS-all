const express = require("express");
const fetchSeller = require("../../middleware/fetchseller");
const {
  httpLogInSeller,
  httpCreateSellerOrder,
  httpGetAllSellerOrders,
  httpGetProductCategories,
  httpGetCurrentSellerInfoById,
  httpDemandCylinders,
  httpAddBalance,
  httpGetAllSellerTransactions,
  httpCreateSellerReturnOrder,
  httpGetSellerReturnOrders,
  httpGetAllSellerConfirmationOrders,
  httpConfirmSellerOrder,
  httpCancleSellerOrder,
} = require("./seller.controller");

const sellerRouter = express.Router();

//auth
sellerRouter.post("/login", httpLogInSeller);

//sellerInfo

sellerRouter.get("/sellerinfo", fetchSeller, httpGetCurrentSellerInfoById)
sellerRouter.post("/demandcylinders", fetchSeller, httpDemandCylinders)
sellerRouter.post("/addbalance", fetchSeller, httpAddBalance)
sellerRouter.get("/transactions", fetchSeller, httpGetAllSellerTransactions)

//product categories
sellerRouter.get("/products", fetchSeller, httpGetProductCategories);

//orders
sellerRouter.post("/createsellerorder", fetchSeller, httpCreateSellerOrder);
sellerRouter.get("/orders", fetchSeller, httpGetAllSellerOrders);
sellerRouter.post("/createreturnorder", fetchSeller, httpCreateSellerReturnOrder)
sellerRouter.get("/returnorders", fetchSeller, httpGetSellerReturnOrders)
sellerRouter.get("/confirmationorders", fetchSeller, httpGetAllSellerConfirmationOrders)
sellerRouter.post("/confirmationorders/:id", fetchSeller, httpConfirmSellerOrder)
sellerRouter.put("/confirmationorders/:id", fetchSeller, httpCancleSellerOrder)


module.exports = sellerRouter;
