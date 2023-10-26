const express = require("express");
const fetchCustomer = require("../../middleware/fetchcustomer");
const {
  httpCreateCustomerAccount,
  httpLoginCustomer,
  httpAddCustomerAddress,
  httpAddCustomerScan,
  httpGetAllCustomerAddressesById,
  httpDeleteCustomerAddressById,
} = require("./customer.controller");

const customerRouter = express.Router();

//auth
customerRouter.post("/createaccount", httpCreateCustomerAccount);
customerRouter.post("/login", httpLoginCustomer);

//address
customerRouter.post("/address", fetchCustomer, httpAddCustomerAddress);
customerRouter.get("/address", fetchCustomer, httpGetAllCustomerAddressesById);
customerRouter.delete("/address/:id", fetchCustomer, httpDeleteCustomerAddressById)
customerRouter.post("/customerscan", fetchCustomer, httpAddCustomerScan)

module.exports = customerRouter;
