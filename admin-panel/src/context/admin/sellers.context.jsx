import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  httpCreateSeller,
  httpCreateSellerDemandOrder,
  httpCreateSellerOrder,
  httpDeleteSeller,
  httpGetAllSellerDemandOrders,
  httpGetAllSellerReturnOrders,
  httpGetAllSellers,
  httpGetAllSellersOrders,
  httpGetSellerById,
  httpGetSellerOrdersBySellerId,
  httpGetSellerTransactionsBySellerId,
  httpUpdateSellerDemandOrder,
  httpUpdateSellerOrder,
  httpUpdateSellerReturnOrder,
} from "../../utils/nodejs/admin";
import { AdminNotificationsContext } from "./admin-notifications.context";
import { AdminAuthContext } from "./auth.context";
import { adminSocket, makeid } from "../socket.io";
import { ProductsContext } from "./products.context";

const cancelAndUpdateOrders = (order, sellersOrders) => {
  order.Payload = [];
  const { OrderId, CreatedAt, SellerId, Payload, Small, Medium, Large } = order;
  let newOrder = {
    CreatedAt,
    DeliveredAt: "",
    OrderId,
    SellerId,
    Payload,
    Status: "Cancelled",
  };
  //temp values
  let quantity = Small + Medium + Large;
  console.log(quantity);
  for (let i = 0; i < quantity; i++) {
    Payload.push(i);
  }
  return [newOrder, ...sellersOrders];
};

const cancelAndUpdateSellerOrders = (OrderId, currentSellerOrders) => {
  for (let i = 0; i < currentSellerOrders.length; i++) {
    if (currentSellerOrders[i].OrderId == OrderId) {
      currentSellerOrders[i].Status = "Cancelled";
      break;
    }
  }
  return [...currentSellerOrders];
};

const updateSellerInfoOnConfirm = (
  confirmOrder,
  transaction,
  currentSellerInfo,
  currentSellerOrders,
  currentSellerTransactions
) => {
  const { OrderId, Amount, Small, Medium, Large, CreatedAt } = confirmOrder;
  //update seller info
  currentSellerInfo.Balance = Number(currentSellerInfo.Balance) - Amount;
  currentSellerInfo.Count =
    Number(currentSellerInfo.Count) +
    Number(Small) +
    Number(Medium) +
    Number(Large);
  currentSellerInfo.Small = Number(currentSellerInfo.Small) - Number(Small);
  currentSellerInfo.Medium = Number(currentSellerInfo.Medium) - Number(Medium);
  currentSellerInfo.Large = Number(currentSellerInfo.Large) - Number(Large);

  //update seller transactions
  // new seller order
  for (let i = 0; i < currentSellerOrders.length; i++) {
    if (currentSellerOrders[i].OrderId == OrderId) {
      currentSellerOrders[i].Status = "Booked";
      break;
    }
  }

  return [
    { ...currentSellerInfo },
    [transaction, ...currentSellerTransactions],
    [...currentSellerOrders],
  ];
};

const updateDemandOrders = async (DemandId, sellerDemandOrders) => {
  let newDemandArray = sellerDemandOrders;
  for (let i = 0; i < newDemandArray.length; i++) {
    if (newDemandArray[i].DemandId == DemandId) {
      try {
        await httpUpdateSellerDemandOrder(DemandId);
      } catch (error) {
        console.log("error in updating demand order", error);
      }
      console.log("updating is created of ", DemandId);
      newDemandArray[i].IsCreated = 1;
      break;
    }
  }
  return [...newDemandArray];
};

const findSellerName = (SellerId, sellersList) => {
  for (let i = 0; i < sellersList.length; i++) {
    if (sellersList[i].SellerId === SellerId) {
      return sellersList[i].FirmName;
    }
  }
};

const addSellerToSellersList = async (sellerToAdd, sellersList) => {
  for (let i = 0; i < sellersList.length; i++) {
    if (sellerToAdd.SellerId === sellersList[i].SellerId) {
      alert("seller id already exists");
      return [...sellersList];
    } else if (sellerToAdd.PhoneNumber === sellersList[i].PhoneNumber) {
      alert("seller Phone Number already exists");
      return [...sellersList];
    }
  }
      return [sellerToAdd, ...sellersList];

};

const removeSellerFromSellersList = async (sellerToDelete, sellersList) => {
  for (let i = 0; i < sellersList.length; i++) {
    if (sellerToDelete.SellerId === sellersList[i].SellerId) {
      try {
        const response = await httpDeleteSeller(sellerToDelete.SellerId);
        //console.log(response)
        if (response.ok) {
          return sellersList.filter(
            (seller) => seller.SellerId !== sellerToDelete.SellerId
          );
        } else {
          //console.log('delete response ok false')
        }
      } catch (error) {
        //console.log('error in deleting seller account', error)
      }
    }
  }
  alert("seller not found");
  return;
};

const updateSellerOrderStattus = async (
  OrderToUpdate,
  newStatus,
  sellersOrders
) => {
  for (let i = 0; i < sellersOrders.length; i++) {
    if (OrderToUpdate.OrderId === sellersOrders[i].OrderId) {
      try {
        //console.log({Status: newStatus}, OrderToUpdate.OrderId)
        const response = await httpUpdateSellerOrder(
          { Status: newStatus },
          OrderToUpdate.OrderId
        );
        if (response.ok) {
          sellersOrders[i].Status = newStatus;
          console.log("sending details", {
            OrderToUpdate,
          });
          adminSocket.emit("update_seller_order_status", {
            SellerId: OrderToUpdate.SellerId,
            OrderId: OrderToUpdate.OrderId,
            Status: newStatus,
          });
          return [...sellersOrders];
        }
      } catch (error) {
        console.log("error in updating seller order", error);
      }
    }
  }
};

export const SellersContext = createContext({
  sellersList: [],
  setSellersList: () => {},
  addNewSeller: () => {},
  deleteSeller: () => {},
  sellersOrders: [],
  setSellersOrders: () => {},
  updateSellerOrder: () => {},
  currentSeller: null,
  changeCurrentSeller: () => {},
  currentSellerInfo: null,
  currentSellerOrders: [],
  currentSellerTransactions: [],
  sellerReturnOrders: [],
  updateCurrentSellerOrders: () => {},
  updateCurrentSellerTransactions: () => {},
  updateCurrentSellerInfo: () => {},
  updateSellerReturnOrderstatus: () => {},
  createSellerOrder: () => {},
  sellerDemandOrders: [],
  updateSellerDemandOrder: () => {},
});

export const SellersProvider = ({ children }) => {
  const { isAdminLogin } = useContext(AdminAuthContext);

  const { adminNotifications, setAdminNotifications } = useContext(
    AdminNotificationsContext
  );
  const { updateAllProducts, setAllProducts } = useContext(ProductsContext);

  const [sellersList, setSellersList] = useState([]);
  const [sellersOrders, setSellersOrders] = useState([]);
  const [currentSeller, setCurrentSeller] = useState(null);
  const [currentSellerInfo, setCurrentSellerInfo] = useState(null);
  const [currentSellerOrders, setCurrentSellerOrders] = useState([]);
  const [currentSellerTransactions, setCurrentSellerTransactions] = useState(
    []
  );
  const [sellerReturnOrders, setSellerReturnOrders] = useState([]);
  const [sellerDemandOrders, setSellerDemandOrders] = useState([]);

  console.log({ sellersOrders });

  //getting all the sellers
  useEffect(() => {
    const getSellersAccountArray = async () => {
      if (isAdminLogin) {
        const sellersAccountArray = await httpGetAllSellers();
        setSellersList(sellersAccountArray);
      }
    };
    getSellersAccountArray();
  }, [isAdminLogin]);

  //get current seller info

  useEffect(() => {
    const getSellerInfo = async () => {
      if (isAdminLogin && currentSeller) {
        let SellerInfo = await httpGetSellerById(currentSeller);
        setCurrentSellerInfo(SellerInfo);
      }
    };
    getSellerInfo();
  }, [isAdminLogin, currentSeller]);

  //getting all the sellers orders

  useEffect(() => {
    const getSellersOrdersArray = async () => {
      if (isAdminLogin) {
        const sellersOrdersArray = await httpGetAllSellersOrders();
        setSellersOrders(sellersOrdersArray);
      }
    };
    getSellersOrdersArray();
  }, [isAdminLogin]);

  //get current seller orders

  useEffect(() => {
    let getSellerOrders = async () => {
      if (isAdminLogin && currentSeller) {
        let SellerOrders = await httpGetSellerOrdersBySellerId(currentSeller);
        setCurrentSellerOrders(SellerOrders);
      }
    };
    getSellerOrders();
  }, [isAdminLogin, currentSeller]);

  //get current seller transactions

  useEffect(() => {
    const getSellerTransactions = async () => {
      if (isAdminLogin) {
        let SellerTransactions = await httpGetSellerTransactionsBySellerId(
          currentSeller
        );
        console.log(SellerTransactions);
        setCurrentSellerTransactions(SellerTransactions);
      }
    };
    getSellerTransactions();
  }, [isAdminLogin, currentSeller]);

  useEffect(() => {
    const getSellerReturnOrders = async () => {
      if (isAdminLogin) {
        let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders();
        setSellerReturnOrders(SellerReturnOrdersArray);
      }
    };
    getSellerReturnOrders();
  }, [isAdminLogin]);

  useEffect(() => {
    const getSellerDemandOrders = async () => {
      if (isAdminLogin) {
        let SellerDemandOrdersArray = await httpGetAllSellerDemandOrders();
        setSellerDemandOrders(SellerDemandOrdersArray);
      }
    };
    getSellerDemandOrders();
  }, [isAdminLogin]);

  //socket code

  useEffect(() => {
    adminSocket.on("update_seller_account_balance", async (data) => {
      if (isAdminLogin) {
        let SellerInfo = await httpGetSellerById(currentSeller);
        setCurrentSellerInfo(SellerInfo);
      }
    });

    return () => adminSocket.off("update_seller_account_balance");
  }, [currentSeller, adminSocket, isAdminLogin]);

  useEffect(() => {
    adminSocket.on(
      "update_seller_demand",
      async ({ quantity, SellerId, Refill }) => {
        if (isAdminLogin) {
          if (currentSeller) {
            let SellerInfo = await httpGetSellerById(currentSeller);
            setCurrentSellerInfo(SellerInfo);
          }
          let SellerDemandOrdersArray = await httpGetAllSellerDemandOrders();
          setSellerDemandOrders(SellerDemandOrdersArray);
          let newQuantity =
            Number(quantity.Small) +
            Number(quantity.Medium) +
            Number(quantity.Large);
          let SellerName = findSellerName(SellerId, sellersList);
          let message = Refill
            ? `${SellerName} requested a Refill for ${newQuantity} cylinders`
            : `${SellerName} requested for ${newQuantity} cylinders`;
          let messageLink = `/admin/demand-orders`;
          let messageId = makeid(5);
          console.log("adding demand message to notification");
          setAdminNotifications([
            { messageId, message, messageLink },
            ...adminNotifications,
          ]);
          console.log("added demand message");
        }
      }
    );

    return () => adminSocket.off("update_seller_demand");
  }, [
    currentSeller,
    adminSocket,
    adminNotifications,
    sellersList,
    currentSellerInfo,
    isAdminLogin,
    sellerDemandOrders,
  ]);

  useEffect(() => {
    adminSocket.on(
      "update_seller_return_orders_list",
      async ({ SellerId, orderToAdd, Refill }) => {
        if (isAdminLogin) {
          console.log("receiving refill order request");
          let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders();
          setSellerReturnOrders(SellerReturnOrdersArray);
          if (!Refill) {
            let SellerName = findSellerName(SellerId, sellersList);
            let messageId = makeid(5);
            let messageLink = "/admin/seller-return-orders";
            let message = `${SellerName} places a return order`;
            setTimeout(() => {
              setAdminNotifications([
                { messageId, message, messageLink },
                ...adminNotifications,
              ]);
            }, 300);
          }
        }
      }
    );

    return () => adminSocket.off("update_seller_return_orders_list");
  }, [
    adminSocket,
    sellerReturnOrders,
    adminNotifications,
    sellersList,
    isAdminLogin,
  ]);

  useEffect(() => {
    adminSocket.on("update_seller_orders", async ({ SellerId }) => {
      console.log(
        "current seller is ",
        currentSeller,
        " and seller id is",
        SellerId
      );
      if (isAdminLogin) {
        if (currentSeller == SellerId) {
          let SellerOrders = await httpGetSellerOrdersBySellerId(currentSeller);
          setCurrentSellerOrders(SellerOrders);
        }
        updateAllProducts();
      }
    });

    return () => adminSocket.off("update_seller_orders");
  }, [isAdminLogin, currentSeller, currentSellerOrders]);

  useEffect(() => {
    adminSocket.on(
      "confirm_create_seller_order_admin",
      async ({ orderToConfirm, transaction }) => {
        if (isAdminLogin) {
          orderToConfirm.Payload = [];
          const {
            OrderId,
            Amount,
            SellerId,
            Payload,
            CreatedAt,
            Small,
            Medium,
            Large,
          } = orderToConfirm;

          let newOrder = {
            CreatedAt,
            DeliveredAt: "",
            OrderId,
            SellerId,
            Payload,
            Status: "Booked",
          };
          //temp values
          let quantity = Small + Medium + Large;
          console.log(quantity);
          for (let i = 0; i < quantity; i++) {
            Payload.push(i);
          }
          setSellersOrders([newOrder, ...sellersOrders]);
          let SellerName = findSellerName(SellerId, sellersList);
          let messageId = makeid(5);
          let messageLink = "/admin/admin-orders";
          let message = `${SellerName} confirms the order ${OrderId} click to see`;
          setTimeout(() => {
            setAdminNotifications([
              { messageId, message, messageLink },
              ...adminNotifications,
            ]);
          }, 300);
          console.log(
            "current seller ",
            currentSeller,
            " seller id ",
            SellerId
          );
          if (currentSeller && currentSeller == SellerId) {
            console.log("current seller id matched");
            console.log(currentSellerInfo);
            let updatedCurrentSellerInfo = updateSellerInfoOnConfirm(
              orderToConfirm,
              transaction,
              currentSellerInfo,
              currentSellerOrders,
              currentSellerTransactions
            );
            console.log(updatedCurrentSellerInfo[0]);
            setCurrentSellerInfo(updatedCurrentSellerInfo[0]);
            setCurrentSellerTransactions(updatedCurrentSellerInfo[1]);
            setCurrentSellerOrders(updatedCurrentSellerInfo[2]);
          }
        }
      }
    );
    return () => adminSocket.off("confirm_create_seller_order_admin");
  }, [
    isAdminLogin,
    currentSeller,
    currentSellerInfo,
    currentSellerOrders,
    currentSellerTransactions,
    sellersOrders,
    adminNotifications,
  ]);

  useEffect(() => {
    adminSocket.on("cancel_create_seller_order_admin", (data) => {
      console.log("getting cancel request");
      if (isAdminLogin) {
        console.log("inside admin", { data });
        const { OrderId, SellerId } = data;
        let cancelledOrderArray = cancelAndUpdateOrders(data, sellersOrders);
        setSellersOrders(cancelledOrderArray);
        if (currentSeller && currentSeller == SellerId) {
          let newCurrentSellerOrderArray = cancelAndUpdateSellerOrders(
            OrderId,
            currentSellerOrders
          );
          setCurrentSellerOrders(newCurrentSellerOrderArray);
        }
        //notification
        let SellerName = findSellerName(SellerId, sellersList);
        let messageId = makeid(5);
        let messageLink = "/admin/admin-orders";
        let message = `${SellerName} cancelled the order ${OrderId} click to see`;
        setTimeout(() => {
          setAdminNotifications([
            { messageId, message, messageLink },
            ...adminNotifications,
          ]);
        }, 300);
        updateAllProducts();
      }
    });

    return () => adminSocket.off("cancel_create_seller_order_admin");
  }, [
    isAdminLogin,
    adminNotifications,
    sellersOrders,
    currentSeller,
    currentSellerOrders,
  ]);

  const addNewSeller = async (sellerToAdd) => {
    const newSellersList = await addSellerToSellersList(
      sellerToAdd,
      sellersList
    );
    setSellersList(newSellersList);
  };

  const deleteSeller = async (sellerToDelete) => {
    const newSellersList = await removeSellerFromSellersList(
      sellerToDelete,
      sellersList
    );
    setSellersList(newSellersList);
  };

  const updateSellerOrder = async (OrderToUpdate, newStatus) => {
    const newSellersOrdersList = await updateSellerOrderStattus(
      OrderToUpdate,
      newStatus,
      sellersOrders
    );
    setSellersOrders(newSellersOrdersList);
  };

  const changeCurrentSeller = (SellerId) => {
    setCurrentSeller(SellerId);
  };

  //update current seller orders on creating orders

  const updateCurrentSellerOrders = (OrderId, Payload) => {
    let date = new Date();
    let CreatedAt = date.toDateString();
    let newOrder = {
      OrderId,
      CreatedAt,
      Status: "Pending",
      Payload,
      SellerId: currentSeller,
    };
    setCurrentSellerOrders([newOrder, ...currentSellerOrders]);
  };

  //update current seller transactions on creating orders

  const updateCurrentSellerTransactions = (TransactionId, Amount, OrderId) => {
    let date = new Date();
    let TransactionDate = date.toDateString();
    let newTransactions = {
      TransactionId,
      TransactionDate,
      Process: 0,
      SellerId: currentSeller,
      Amount,
      OrderId,
    };
    setCurrentSellerTransactions([
      newTransactions,
      ...currentSellerTransactions,
    ]);
  };

  //update current seller count and demand
  const updateCurrentSellerInfo = (Payload, Amount) => {
    let sellerInfo = currentSellerInfo;
    sellerInfo.Count = Payload.length + Number(sellerInfo.Count);
    sellerInfo.Demand = Number(sellerInfo.Demand) - Payload.length;
    sellerInfo.Balance = Number(sellerInfo.Balance) - Number(Amount);
    setCurrentSellerInfo(sellerInfo);
  };

  //upadte seller return order status

  const updateSellerReturnOrderstatus = async (
    orderDetails,
    ReturnOrderId,
    SellerId
  ) => {
    let response = await httpUpdateSellerReturnOrder(
      orderDetails,
      ReturnOrderId
    );
    if (response.success) {
      let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders(); // or update seller return order manually in front end
      setSellerReturnOrders(SellerReturnOrdersArray);
      if (orderDetails.Cylinders != null) {
        updateAllProducts();
        if (Number(currentSeller) === SellerId) {
          console.log(currentSellerInfo);
          let sellerInfo = currentSellerInfo;
          sellerInfo.Count =
            Number(currentSellerInfo.Count) - orderDetails.Cylinders.length;
          setCurrentSellerInfo(sellerInfo);
        }
      }
      adminSocket.emit("update_seller_return_order_status", {
        ReturnOrderId,
        SellerId,
        Status: orderDetails.Status,
      });
    }
  };

  //Create seller order

  const createSellerOrder = async (OrderDetails) => {
    const { Cylinders, Amount, quantity, SellerId } = OrderDetails;
    const { Small_Qty, Medium_Qty, Large_Qty } = quantity;
    let Quantity = {
      Small: Small_Qty,
      Medium: Medium_Qty,
      Large: Large_Qty,
    };
    try {
      let response = await httpCreateSellerOrder(
        { Cylinders, Amount, Quantity },
        SellerId
      );
      console.log({ response });
      if (response.success) {
        if (currentSeller && currentSeller == SellerId) {
          updateCurrentSellerOrders(response.OrderId, Cylinders);
          adminSocket.emit("created_seller_order", { SellerId: currentSeller });
        } else {
          adminSocket.emit("created_seller_order", { SellerId });
        }
        updateAllProducts();
      } else {
        console.log("order not placed", response);
      }
    } catch (error) {
      console.log("error in creating order", error);
    }
  };

  const updateSellerDemandOrder = async (DemandId) => {
    let newDemandOrderArray = await updateDemandOrders(
      DemandId,
      sellerDemandOrders
    );
    console.log({ newDemandOrderArray });
    setSellerDemandOrders(newDemandOrderArray);
  };

  // const createSellerOrderFromDemand = async (OrderDetails, DemandId) => {
  //   const { Cylinders, Amount } = OrderDetails;
  //   try {
  //     let response = await httpCreateSellerDemandOrder(OrderDetails, DemandId);
  //     console.log({ response });
  //     if (response.success) {
  //       updateCurrentSellerOrders(response.OrderId, Cylinders);
  //       updateCurrentSellerTransactions(
  //         response.TransactionId,
  //         Amount,
  //         response.OrderId
  //       );
  //       let sellerId = response.sellerId;
  //       // updateCurrentSellerInfo(Cylinders, Amount);
  //       updateAllProducts();
  //       let newDemandOrderArray = updateDemandOrderArray(sellerDemandOrders, DemandId);
  //       console.log('new updated demand order array ', newDemandOrderArray)
  //       setSellerDemandOrders(newDemandOrderArray);
  //       adminSocket.emit("created_seller_demand_order", { sellerId });
  //     } else {
  //       console.log("order not placed", response);
  //     }
  //   } catch (error) {
  //     console.log("error in creating order", error);
  //   }
  // };

  const value = {
    sellersList,
    setSellersList,
    addNewSeller,
    deleteSeller,
    sellersOrders,
    setSellersOrders,
    updateSellerOrder, //order-status
    currentSeller,
    changeCurrentSeller,
    currentSellerInfo,
    currentSellerOrders,
    currentSellerTransactions,
    sellerReturnOrders,
    updateCurrentSellerOrders,
    updateCurrentSellerTransactions,
    updateCurrentSellerInfo,
    updateSellerReturnOrderstatus,
    createSellerOrder,
    sellerDemandOrders,
    updateSellerDemandOrder,
  };

  return (
    <SellersContext.Provider value={value}>{children}</SellersContext.Provider>
  );
};
