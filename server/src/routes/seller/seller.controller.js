const {
  logInSeller,
  createSellerOrder,
  createOrderPayload,
  getAllSellerOrders,
  getProductCategories,
  getCurrentSellerInfoById,
  demandCylinders,
  addBalanceToSellerAccount,
  getAllSellerTransaction,
  createSellerReturnOrder,
  getSellerReturnOrder,
  getSellerConfirmationOrders,
  confirmSellerOrder,
  cancelSellerOrder,
} = require("../../models/seller.model");
var jwt = require("jsonwebtoken");
const { SortSellerOrders } = require("../../helper-function/helper-functions");
const JWT_TOKEN = "breakthematrix";

async function httpLogInSeller(req, res) {
  await logInSeller(req.body, function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

// get current seller info

async function httpGetCurrentSellerInfoById(req, res) {
  let sellerID = req.seller.Id
  await getCurrentSellerInfoById(sellerID, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpDemandCylinders (req, res) {
  let sellerID = req.seller.Id
  await demandCylinders(sellerID, req.body, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpAddBalance (req, res) {
  let sellerID = req.seller.Id
  await addBalanceToSellerAccount(sellerID, req.body, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpGetAllSellerConfirmationOrders (req, res) {
  let sellerID = req.seller.Id;
  await getSellerConfirmationOrders(sellerID, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpConfirmSellerOrder (req, res) {
  let sellerID = req.seller.Id;
  let OrderId = req.params.id;
  await confirmSellerOrder(sellerID, req.body, OrderId, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpCancleSellerOrder (req, res) {
  let OrderId = req.params.id;
  await cancelSellerOrder(OrderId, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

//get all seller transaction

async function httpGetAllSellerTransactions (req, res) {
  let sellerID = req.seller.Id
  await getAllSellerTransaction(sellerID, function (err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}


// Product Categories

async function httpGetProductCategories(req, res) {
  await getProductCategories(function (err, data) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
}

//Seller Orders

async function httpCreateSellerOrder(req, res) {
  const token = req.header("auth-token");
  const data = jwt.verify(token, JWT_TOKEN);
  const Id = data.seller.Id;
  const orderDetails = { ...req.body, SellerId: Id };
  console.log(orderDetails);
  await createSellerOrder(orderDetails, async function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      await createOrderPayload(req.body.Payload, data.OrderId, function (err, data2) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(data);
        }
      });
    }
  });
}

async function httpGetAllSellerOrders(req, res) {
  const token = req.header("auth-token");
  const data = jwt.verify(token, JWT_TOKEN);
  const Id = data.seller.Id;
  console.log("seller Id", Id);
  await getAllSellerOrders(Id, function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.length === 0) {
        res.status(200).json([])
      } else {
        let newArr = SortSellerOrders(data)
        res.status(200).json(newArr)
      }
    }
  });
}

async function httpCreateSellerReturnOrder (req, res) {
  console.log(req.seller)
  SellerId = req.seller.Id;
  await createSellerReturnOrder(SellerId, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}

async function httpGetSellerReturnOrders (req, res) {
  SellerId = req.seller.Id;
  await getSellerReturnOrder(SellerId, function(err, data) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(data)
    }
  })
}



module.exports = {
  httpLogInSeller,
  httpGetCurrentSellerInfoById,
  httpDemandCylinders,
  httpAddBalance,
  httpGetAllSellerConfirmationOrders,
  httpConfirmSellerOrder,
  httpCancleSellerOrder,
  httpGetAllSellerTransactions,
  httpGetProductCategories,
  httpCreateSellerOrder,
  httpGetAllSellerOrders,
  httpCreateSellerReturnOrder,
  httpGetSellerReturnOrders
};
