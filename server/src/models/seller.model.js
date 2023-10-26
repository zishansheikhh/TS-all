const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { db } = require("../services/mysql");

const JWT_TOKEN = "breakthematrix";

async function logInSeller(sellerCred, callback) {
  const { PhoneNumber, Password } = sellerCred;
  let sql = `SELECT * FROM sellers WHERE PhoneNumber = ${PhoneNumber}`;
  db.query(sql, async function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      if (result.length < 1) {
        callback("seller account not found", null);
      } else {
        let comparePassword = await bcrypt.compare(
          Password,
          result[0].Password
        );
        if (!comparePassword) {
          callback("password does not match", null);
        } else {
          let data = {
            seller: {
              PhoneNumber,
              Id: result[0].SellerId,
              isSeller: true,
            },
          };
          const authToken = jwt.sign(data, JWT_TOKEN);
          let success = true;
          callback(null, { authToken, success });
        }
      }
    }
  });
}

// get current seller info

async function getCurrentSellerInfoById(Id, callback) {
  let sql = `SELECT SellerId, FirmName, FirstName, LastName, PhoneNumber, Address, City, State, Balance, Count, Small, Medium, Large FROM sellers WHERE SellerId = ${Id}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
}

async function demandCylinders(Id, quantity, callback) {
  console.log(quantity)
  const {Small, Medium, Large} = quantity;
  db.getConnection(function(err, connection) {
    if (err) {
      callback(err, null);
    } else {
      connection.beginTransaction(function(err) {
        if (err) {
          callback(err, null)
        }
        let sql0 = `SELECT Small, Medium, Large FROM sellers WHERE SellerId = ${Id}`
        connection.query(sql0, function(err0, result0) {
        if (err0) {
          return connection.rollback(function() {
            callback(err0, null)
          })
        } else {
          let newSmall = Number(result0[0].Small) + Number(Small)
          let newMedium = Number(result0[0].Medium) + Number(Medium)
          let newLarge = Number(result0[0].Large) + Number(Large)
          let sql = `UPDATE sellers SET Small = ${newSmall}, Medium = ${newMedium}, Large = ${newLarge} WHERE SellerId = ${Id}`;
          connection.query(sql, function (err, result) {
            if (err) {
              return connection.rollback(function() {
                callback(err0, null);
              });
            } else {
              let sql = `INSERT INTO demand_orders SET ?`;
              connection.query(sql, {SellerId : Id, Small, Medium, Large}, function(err, result) {
                if (err) {
                  return connection.rollback(function() {
                    callback(err, null)
                  })
                } else {
                  connection.commit(function(err, result) {
                    if (err) {
                      return connection.rollback(function() {
                        callback(err, null)
                      })
                    } else {
                      callback(null, {
                        success: true
                      });
                    }
                  })
                }
              })
            }
          });
        }
      })
      })
    }
  })
}

async function addBalanceToSellerAccount(Id, transaction, callback) {
  const { Process, Amount, Method, TransactionDate } = transaction;
  db.getConnection(function(err, connection) {
    if (err) {
      callback(err, null);
    }
    connection.beginTransaction(function (err) {
      if (err) {
        callback(err, null);
      } else {
        let sql1 = `SELECT Balance FROM sellers WHERE SellerId = ${Id}`;
        connection.query(sql1, function (err1, result1) {
          if (err1) {
            return connection.rollback(function () {
              callback(err1, null);
            });
          } else {
            let NewAmount = Number(result1[0].Balance) + Number(Amount);
            let sql = `UPDATE sellers SET Balance = ${NewAmount} WHERE SellerId = ${Id}`;
            connection.query(sql, function (err2, result) {
              if (err2) {
                return connection.rollback(function () {
                  callback(err2, null);
                });
              } else {
                let sql = "INSERT INTO seller_transactions SET ?";
                connection.query(sql,{ SellerId: Id, Process, Amount, Method, TransactionDate },function (err4, result) {
                    if (err4) {
                      return connection.rollback(function() {
                        callback(err4, null)
                      })
                    } else {
                      let TransactionId = result.insertId
                      connection.commit(function (err3) {
                        if (err3) {
                          return connection.rollback(function () {
                            callback(err3, null);
                          });
                        } else {
                          callback(null, {
                            TransactionId,
                            success: true,
                          });
                        }
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  })
}

async function getSellerConfirmationOrders(Id, callback) {
  let sql = `SELECT OrderId, Amount, Small, Medium, Large, CreatedAt FROM seller_orders WHERE SellerId = ${Id} AND IsConfirm = ${0} AND IsCancelled = ${0} ORDER BY OrderId DESC`
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}


async function confirmSellerOrder(sellerId, orderDetails, OrderId, callback) {
  const { Amount, Quantity, CreatedAt } = orderDetails;
  const { Small, Medium, Large } = Quantity;
  db.getConnection(function (err, connection) {
    if (err) {
      callback(err, null);
    }
    connection.beginTransaction(async function (err) {
      if (err) {
        callback(err, null);
      }
      let sql = `UPDATE seller_orders SET Status = 'Booked', IsConfirm = ${1} WHERE OrderId = ${OrderId}`;
      connection.query(sql, function (err, result) {
        if (err) {
          return connection.rollback(function () {
            callback(err, null);
          });
        } else {
          let sql = `SELECT Balance, Count, Small, Medium, Large FROM sellers WHERE SellerId = ${sellerId}`;
          connection.query(sql, function (err4, result4) {
            if (err4) {
              return connection.rollback(function () {
                callback(err4, null);
              });
            } else {
              let Balance = result4[0].Balance;
              let NetBalance = Balance - Amount;
              let NewSmall = result4[0].Small - Number(Small);
              let NewMedium = result4[0].Medium - Number(Medium);
              let NewLarge = result4[0].Large - Number(Large);
              let NewCount = Number(result4[0].Count) + Number(Small) + Number(Medium) + Number(Large);
              let sql = `UPDATE sellers SET Balance = ${NetBalance}, Count = ${NewCount}, Small = ${NewSmall}, Medium = ${NewMedium}, Large = ${NewLarge} WHERE SellerId = ${sellerId}`;
              connection.query(sql, function (err5, result5) {
                if (err5) {
                  return connection.rollback(function () {
                    callback(err5, null);
                  });
                } else {
                  let sql = `INSERT INTO seller_transactions SET ?`;
                  connection.query(
                    sql,
                    {
                      SellerId: sellerId,
                      Process: 0,
                      Amount,
                      OrderId,
                      TransactionDate: CreatedAt,
                    },
                    function (err6, result6) {
                      if (err6) {
                        return connection.rollback(function () {
                          callback(err6, null);
                        });
                      } else {
                        let TransactionId = result6.insertId
                        connection.commit(function (err2) {
                          if (err2) {
                            return connection.rollback(function () {
                              callback(err2, null);
                            });
                          } else {
                            callback(null, {
                              success: true,
                              TransactionId
                            });
                          }
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    });
  });
}

async function cancelSellerOrder (OrderId, callback) {
  db.getConnection(function (err, connection) {
    if (err) {
      callback(err, null)
    }
    connection.beginTransaction(async function(err) {
      if (err) {
        callback(err, null)
      }
      let sql = `UPDATE seller_orders SET IsCancelled = ${1}, Editable = ${0}, IsConfirm = ${1}, Status = 'Cancelled' WHERE OrderId = ${OrderId}`
      connection.query(sql, function(err, result) {
        if (err) {
          return connection.rollback(function() {
            callback(err, null)
          })
        }
        let sql = `SELECT * FROM seller_order_payload WHERE OrderId = ${OrderId}`
        connection.query(sql, function(err, result) {
          if (err) {
            return connection.rollback(function() {
              callback(err, null)
            })
          }
          result.map((Payload) => {
            const {ProductId} = Payload;
            let sql = `UPDATE products SET WithSeller = ${1}, Status = 'in stock' WHERE ProductId = ${ProductId}`
            connection.query(sql, function(err, result) {
              if (err) {
                return connection.rollback(function() {
                  callback(err, null)
                })
              }
            })
          })
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                callback(err, null)
              })
            } else {
              callback(null, {
                success: true,
              })
            }
          })
        })
      })
    })
  })
}

//get all transactions of seller

async function getAllSellerTransaction(Id, callback) {
  let sql = `SELECT * FROM seller_transactions WHERE SellerId = ${Id} ORDER BY TransactionId DESC`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

// get product categories

async function getProductCategories(callback) {
  let sql = "SELECT * FROM product_categories";
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

// Creating Orders

async function createSellerOrder(orderDetails, callback) {
  // const {Manufacturer, Status, Payment, SellerId} = orderDetails
  // let sql = 'INSERT INTO seller_orders SET ?'
  // db.query(sql, {Manufacturer, Status, Payment, SellerId}, function(err, result) {
  //   if (err) {
  //     callback(err, null)
  //   } else {
  //     callback(null, {
  //       ok: true,
  //       OrderId: result.insertId
  //     })
  //   }
  // })
}

async function createOrderPayload(Payload, OrderId, callback) {
  let sql =
    "INSERT INTO seller_order_payload (OrderId, ProductId, Quantity) VALUES ?";
  db.query(
    sql,
    [Payload.map((item) => [OrderId, item.ProductId, item.Quantity])],
    function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "order placed successfully");
      }
    }
  );
}

async function getAllSellerOrders(SellerId, callback) {
  let sql = `SELECT * FROM seller_orders 
      JOIN seller_order_payload ON seller_orders.OrderId = seller_order_payload.OrderId 
    WHERE SellerId = ${SellerId}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}


async function createSellerReturnOrder (SellerId, callback) {
  let date = new Date()
  let CreatedAt = date.toDateString();
  let sql = `INSERT INTO seller_return_orders SET ?`
  db.query(sql, {SellerId, CreatedAt, Status: 'Booked'}, function(err, result) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, {
        ReturnOrderId : result.insertId,
        success: true
      })
    }
  })
}

async function getSellerReturnOrder (SellerId, callback) {
  let sql = `SELECT * FROM seller_return_orders WHERE SellerId = ${SellerId} ORDER BY ReturnOrderId DESC`
  db.query(sql, function(err, result) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
}



async function getSellerInfoById(SellerId, callback) {
  let sql = `SELECT FirmName FROM sellers WHERE SellerId=${SellerId}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  logInSeller,
  getCurrentSellerInfoById,
  demandCylinders,
  addBalanceToSellerAccount,
  getSellerConfirmationOrders,
  confirmSellerOrder,
  cancelSellerOrder,
  getAllSellerTransaction,
  getProductCategories,
  createSellerOrder,
  createOrderPayload,
  getAllSellerOrders,
  createSellerReturnOrder,
  getSellerReturnOrder,
};
