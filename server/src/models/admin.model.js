const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create admin account

const { db } = require("../services/mysql");

const JWT_TOKEN = "breakthematrix";

async function createAdminAccount(adminDetails, callback) {
  //encrypt password
  const { Password } = adminDetails;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(Password, salt);
  let sql = "INSERT INTO admins SET ?";
  db.query(
    sql,
    { ...adminDetails, Password: hashPass },
    async (err, result) => {
      if (err) {
        callback(err);
      } else {
        let data = {
          admin: {
            PhoneNumber: adminDetails.PhoneNumber,
            isAdmin: true,
          },
        };
        const authToken = jwt.sign(data, JWT_TOKEN);
        let success = true;
        callback(null, { authToken, success });
      }
    }
  );
}

async function loginInAdmin(adminCreds, callback) {
  const { PhoneNumber, Password } = adminCreds;
  let sql = `SELECT * FROM admins WHERE PhoneNumber = ${PhoneNumber}`;
  db.query(sql, async (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.length < 1) {
        callback("admin not found", null);
      } else {
        let comparePassword = await bcrypt.compare(
          Password,
          result[0].Password
        );
        if (!comparePassword) {
          callback("password does not match", null);
        } else {
          let data = {
            admin: {
              PhoneNumber,
              isAdmin: true,
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

//Seller functions

async function createSellerAccount(sellerDetails, callback) {
  const { PhoneNumber, Password } = sellerDetails;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(Password, salt);
  let sql0 = `SELECT SellerId From sellers WHERE PhoneNumber = ${PhoneNumber}`;
  db.query(sql0, function (err0, result0) {
    if (err0) {
      callback(err0, null);
    } else {
      if (result0.length > 0) {
        callback("Seller With This phone number already exist", null);
      } else {
        let sql = "INSERT INTO sellers SET ?";
        db.query(
          sql,
          { ...sellerDetails, Password: hashPass },
          async (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, {
                ok: true,
                SellerId: result.insertId,
              });
            }
          }
        );
      }
    }
  });
}

async function getAllSellers(callback) {
  let sql = "SELECT * FROM sellers WHERE IsOwner = 0 ORDER BY SellerId DESC";
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

async function getSellerById(id, callback) {
  let sql = `SELECT FirmName, FirstName, LastName, PhoneNumber, Address, City, State, Balance, Count, Small, Medium, Large FROM sellers WHERE SellerId = ${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
}

async function deleteSellerById(Id, callback) {
  let sql = `DELETE FROM sellers WHERE SellerId = ${Id}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, {
        ok: true,
      });
    }
  });
}

//Seller orders

async function createSellerOrder(sellerId, orderDetails, callback) {
  const { Cylinders, Amount, Quantity } = orderDetails;
  const { Small, Medium, Large } = Quantity;
  const date = new Date();
  const CreatedAt = date.toDateString();
  db.getConnection(function (err, connection) {
    if (err) {
      callback(err, null);
    }
    connection.beginTransaction(async function (err) {
      if (err) {
        callback(err, null);
      }
      let sql = `INSERT INTO seller_orders SET ?`;
      connection.query(
        sql,
        { sellerId, Amount, CreatedAt, Status: "Pending", Small, Medium, Large },
        function (err, result) {
          if (err) {
            return connection.rollback(function () {
              callback(err, null);
            });
          } else {
            let OrderId = result.insertId;
            try {
              Cylinders.map((cylinder) => {
                let sql = `INSERT INTO seller_order_payload SET ?`;
                connection.query(
                  sql,
                  { ProductId: cylinder, OrderId },
                  function (err1, result1) {
                    if (err1) {
                      return connection.rollback(function () {
                        callback(err1, null);
                      });
                    }
                  }
                );
              });
            } catch (error) {
              return connection.rollback(function () {
                callback(
                  "cannot insert order payload, Cylinders.map is not an function",
                  null
                );
              });
            }
            try {
              Cylinders.map((cylinder) => {
                let sql = `UPDATE products SET WithSeller = ${sellerId}, Status = 'in transit' WHERE ProductId = ${cylinder}`;
                connection.query(sql, function (err3, result3) {
                  if (err3) {
                    return connection.rollback(function () {
                      callback(err3, null);
                    });
                  }
                });
              });
            } catch (error) {
              return connection.rollback(function () {
                callback(
                  "cannot update product status, Cylinders.map is not an function",
                  null
                );
              });
            }
            connection.commit(function (err2) {
              if (err2) {
                return connection.rollback(function () {
                  callback(err2, null);
                });
              } else {
                callback(null, {
                  success: true,
                  OrderId,
                });
              }
            });
          }
        }
      );
    });
  });
}

// async function createSellerDemandOrder(DemandId, orderDetails, callback) {
//   const { Cylinders, Amount, Quantity } = orderDetails;
//   const {Small, Medium, Large} = Quantity;
//   const date = new Date();
//   const CreatedAt = date.toDateString();
//   db.getConnection(function (err, connection) {
//     if (err) {
//       callback(err, null);
//     }
//     connection.beginTransaction(async function (err) {
//       if (err) {
//         callback(err, null);
//       }
//       //add demand code and select selllerid and update is completed
//       let sql = `SELECT SellerId FROM demand_orders WHERE DemandId = ${DemandId}`;
//       connection.query(sql, function (err, result) {
//         if (err) {
//           callback(err, null);
//         } else {
//           let sellerId = result[0].SellerId;
//           let sql = `UPDATE demand_orders SET IsCreated = ${1} WHERE DemandId = ${DemandId}`;
//           connection.query(sql, function (err, result) {
//             if (err) {
//               return connection.rollback(function () {
//                 callback(err, null);
//               });
//             } else {
//               let sql = `INSERT INTO seller_orders SET ?`;
//               connection.query(
//                 sql,
//                 {
//                   sellerId,
//                   Amount,
//                   CreatedAt,
//                   Status: "Booked",
//                 },
//                 function (err, result) {
//                   if (err) {
//                     return connection.rollback(function () {
//                       callback(err, null);
//                     });
//                   } else {
//                     let OrderId = result.insertId;
//                     try {
//                       Cylinders.map((cylinder) => {
//                         let sql = `INSERT INTO seller_order_payload SET ?`;
//                         connection.query(
//                           sql,
//                           { ProductId: cylinder, OrderId },
//                           function (err1, result1) {
//                             if (err1) {
//                               return connection.rollback(function () {
//                                 callback(err1, null);
//                               });
//                             }
//                           }
//                         );
//                       });
//                     } catch (error) {
//                       return connection.rollback(function () {
//                         callback(
//                           "cannot insert order payload, Cylinders.map is not an function",
//                           null
//                         );
//                       });
//                     }
//                     //do after order is confirmed
//                     try {
//                       Cylinders.map((cylinder) => {
//                         let sql = `UPDATE products SET WithSeller = ${sellerId}, Status = 'in transit' WHERE ProductId = ${cylinder}`;
//                         connection.query(sql, function (err3, result3) {
//                           if (err3) {
//                             return connection.rollback(function () {
//                               callback(err3, null);
//                             });
//                           }
//                         });
//                       });
//                     } catch (error) {
//                       return connection.rollback(function () {
//                         callback(
//                           "cannot update product status, Cylinders.map is not an function",
//                           null
//                         );
//                       });
//                     }
//                     let sql = `SELECT Balance, Count, Small, Medium, Large FROM sellers WHERE SellerId = ${sellerId}`;
//                     connection.query(sql, function (err4, result4) {
//                       if (err4) {
//                         return connection.rollback(function () {
//                           callback(err4, null);
//                         });
//                       } else {
//                         let Balance = result4[0].Balance;
//                         let NetBalance = Balance - Amount;
//                         let NewSmall = result4[0].Small - Number(Small);
//                         let NewMedium = result4[0].Medium - Number(Medium);
//                         let NewLarge = result4[0].Large - Number(Large);
//                         let NewCount =
//                           Number(result4[0].Count) + Cylinders.length;
//                         let sql = `UPDATE sellers SET Balance = ${NetBalance}, Count = ${NewCount}, Small = ${NewSmall}, Medium = ${NewMedium}, Large = ${NewLarge} WHERE SellerId = ${sellerId}`;
//                         connection.query(sql, function (err5, result5) {
//                           if (err5) {
//                             return connection.rollback(function () {
//                               callback(err5, null);
//                             });
//                           } else {
//                             let sql = `INSERT INTO seller_transactions SET ?`;
//                             connection.query(
//                               sql,
//                               {
//                                 SellerId: sellerId,
//                                 Process: 0,
//                                 Amount,
//                                 OrderId,
//                                 TransactionDate: CreatedAt,
//                               },
//                               function (err6, result6) {
//                                 if (err6) {
//                                   return connection.rollback(function () {
//                                     callback(err6, null);
//                                   });
//                                 } else {
//                                   let TransactionId = result6.insertId;
//                                   connection.commit(function (err2) {
//                                     if (err2) {
//                                       return connection.rollback(function () {
//                                         callback(err2, null);
//                                       });
//                                     } else {
//                                       callback(null, {
//                                         success: true,
//                                         OrderId,
//                                         TransactionId,
//                                         sellerId,
//                                       });
//                                     }
//                                   });
//                                 }
//                               }
//                             );
//                           }
//                         });
//                       }
//                     });
//                   }
//                 }
//               );
//             }
//           });
//         }
//       });
//     });
//   });
// }

async function updateSellerDemandOrder(DemandId, callback) {
  let sql = `UPDATE demand_orders SET IsCreated = ${1} WHERE DemandId = ${DemandId}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, {
        success: true,
      });
    }
  });
}

async function getAllSellersOrders(callback) {
  let sql = `SELECT * FROM seller_orders 
  JOIN seller_order_payload ON seller_orders.OrderId = seller_order_payload.OrderId WHERE IsConfirm = ${1}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

async function getSellerOrdersBySellerId(SellerId, callback) {
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

async function updateSellerOrderStatus(OrderId, Status, callback) {
  let sql0 = `SELECT Editable FROM seller_orders WHERE OrderId = ${OrderId}`;
  db.query(sql0, function (err0, result0) {
    if (err0) {
      callback(err0, null);
    } else {
      if (result0[0].Editable === 0) {
        callback("Cannot update an already delivered order", null);
      } else {
        let sql = `UPDATE seller_orders SET Status = ? WHERE OrderId = ?`;
        db.query(sql, [Status, OrderId], function (err, result) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, {
              ok: true,
            });
          }
        });
      }
    }
  });
}

async function sellerOrderDelivered(OrderId, Status, callback) {
  db.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }
    connection.beginTransaction(function (err) {
      if (err) {
        callback(err, null);
      } else {
        let date = new Date();
        let DeliveredAt = date.toDateString();
        let sql = `UPDATE seller_orders SET Status = ?, DeliveredAt = ?, Editable = 0 WHERE OrderId = ?`;
        connection.query(
          sql,
          [Status, DeliveredAt, OrderId],
          function (err1, result1) {
            if (err1) {
              return connection.rollback(function () {
                callback(err1, null);
              });
            } else {
              let sql = `SELECT ProductId FROM seller_order_payload WHERE OrderId = ${OrderId}`;
              connection.query(sql, function (err2, result2) {
                if (err) {
                  return connection.rollback(function () {
                    callback(err2, null);
                  });
                } else {
                  result2.map((product) => {
                    let sql = `UPDATE products SET Status = ? WHERE ProductId = ?`;
                    connection.query(
                      sql,
                      ["with seller", product.ProductId],
                      function (err3, result3) {
                        if (err3) {
                          return connection.rollback(function () {
                            callback(err3, null);
                          });
                        }
                      }
                    );
                  });
                  connection.commit(function (err5) {
                    if (err5) {
                      return connection.rollback(function () {
                        callback(err5, null);
                      });
                    } else {
                      callback(null, {
                        ok: true,
                      });
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  });
}

//seller return orders

async function updateSellerReturnOrderStatus(ReturnOrderId, Status, callback) {
  let sql = `SELECT IsCompleted FROM seller_return_orders WHERE ReturnOrderId = ${ReturnOrderId}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      if (result[0].IsCompleted === 1) {
        callback(
          "this return order has been received and cannot further change",
          null
        );
      } else {
        let sql = `UPDATE seller_return_orders SET Status = ? WHERE ReturnOrderId = ${ReturnOrderId}`;
        db.query(sql, [Status], function (err, result) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, {
              success: true,
              message: `return order status changed to ${Status}`,
            });
          }
        });
      }
    }
  });
}

async function sellerReturnOrderReceived(
  ReturnOrderId,
  Status,
  Cylinders,
  callback
) {
  db.getConnection(function (err, connection) {
    if (err) {
      callback(err, null);
    }
    connection.beginTransaction(function (err) {
      if (err) {
        callback(err, null);
      } else {
        let sql = `SELECT IsCompleted, SellerId FROM seller_return_orders WHERE ReturnOrderId = ${ReturnOrderId}`;
        connection.query(sql, function (err, result) {
          if (err) {
            return connection.rollback(function () {
              callback(err, null);
            });
          } else {
            let SellerId = result[0].SellerId;
            if (result[0].IsCompleted === 1) {
              return connection.rollback(function () {
                callback(
                  "this return order has been received and cannot further change",
                  null
                );
              });
            } else {
              let date = new Date();
              let ReceivedAt = date.toDateString();
              let sql = `UPDATE seller_return_orders SET Status = ?, IsCompleted = ?, ReceivedAt = ? WHERE ReturnOrderId = ${ReturnOrderId}`;
              connection.query(
                sql,
                [Status, 1, ReceivedAt],
                function (err, result) {
                  if (err) {
                    return connection.rollback(function () {
                      callback(err, null);
                    });
                  } else {
                    Cylinders.map((CylinderId) => {
                      let sql = `UPDATE products SET WithSeller = ?, Status = ? WHERE ProductId = ${CylinderId}`;
                      connection.query(
                        sql,
                        [1, "in stock"],
                        function (err, result) {
                          if (err) {
                            return connection.rollback(function () {
                              callback(err, null);
                            });
                          }
                        }
                      );
                    });
                    let sql = `SELECT Count FROM sellers WHERE SellerId = ${SellerId}`;
                    connection.query(sql, function (err, result) {
                      if (err) {
                        return connection.rollback(function () {
                          callback(err, null);
                        });
                      } else {
                        let NewCount = result[0].Count - Cylinders.length;
                        let sql = `UPDATE sellers SET Count = ? WHERE SellerId = ${SellerId}`;
                        connection.query(
                          sql,
                          [NewCount],
                          function (err, result) {
                            if (err) {
                              return connection.rollback(function () {
                                callback(err, null);
                              });
                            } else {
                              connection.commit(function (err) {
                                if (err) {
                                  return connection.rollback(function () {
                                    callback(err, null);
                                  });
                                } else {
                                  callback(null, {
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
                }
              );
            }
          }
        });
      }
    });
  });
}

async function getAllSellerDemandOrders(callback) {
  let sql = `SELECT demand_orders.DemandId, demand_orders.SellerId, demand_orders.Small, demand_orders.Medium, demand_orders.Large, sellers.FirmName, demand_orders.IsCreated FROM demand_orders  
  JOIN sellers ON demand_orders.SellerId = sellers.SellerId
  WHERE IsCreated = ${0}
  ORDER BY DemandId DESC`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

async function getAllSellerReturnOrders(callback) {
  let sql = "SELECT * FROM seller_return_orders ORDER BY ReturnOrderId DESC";
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

//Product Function

async function addNewProduct(productDetails, callback) {
  let sql0 = `SELECT ProductId FROM products WHERE MFID = ?`;
  db.query(sql0, [productDetails.MFID], function (err0, result0) {
    if (err0) {
      callback(err0, null);
    } else {
      if (result0.length > 0) {
        callback("MFID already exists", null);
      } else {
        let sql = "INSERT INTO products SET ?";
        db.query(sql, productDetails, function (err, result) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, {
              ok: true,
              ProductId: result.insertId,
            });
          }
        });
      }
    }
  });
}

async function getAllProducts(callback) {
  let sql = `SELECT ProductId, MFID, Volume, ImageURL, Status, ProductSize, WithSeller, FirmName, Address, City FROM products
    JOIN sellers ON products.WithSeller = sellers.SellerId
  ORDER BY CreatedAt DESC`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

async function getProductById(id, callback) {
  let sql = `SELECT * FROM products WHERE ProductId = ${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
}

async function deleteProductById(Id, callback) {
  let sql = `DELETE FROM products WHERE ProductId = ${Id}`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { ok: true });
    }
  });
}

//customers

//FirstName, CustomerId, PhoneNumber, AltNumber, Country, State, City, Pincode, Landmark, BuildingName, AddressType
async function getAllCustomers(callback) {
  let sql = `SELECT * FROM customers
    JOIN customer_addresses ON customers.CustomerId = customer_addresses.CustomerId`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

//seller transactions

async function getSellerTransactionsBySellerId(SellerId, callback) {
  let sql = `SELECT * FROM seller_transactions WHERE SellerId = ${SellerId} ORDER BY TransactionId DESC`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  createAdminAccount,
  loginInAdmin,
  createSellerAccount,
  getAllSellers,
  getSellerById,
  deleteSellerById,
  createSellerOrder,
  // createSellerDemandOrder,
  updateSellerDemandOrder,
  sellerOrderDelivered,
  updateSellerReturnOrderStatus,
  sellerReturnOrderReceived,
  getAllSellerDemandOrders,
  getAllSellerReturnOrders,
  addNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  getAllSellersOrders,
  getSellerOrdersBySellerId,
  updateSellerOrderStatus,
  getAllCustomers,
  getSellerTransactionsBySellerId,
};
