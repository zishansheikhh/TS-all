const API = 'https://api.leveranceoxygen.com/admin';
// const API = 'http://localhost:8000/admin';


async function httpCreateAdmin (adminCred) {
    const response = await fetch(`${API}/createadmin`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(adminCred)
    })
    const admin = await response.json()
    return admin
}

async function httpLoginAdmin (adminCred) {
    const response = await fetch(`${API}/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(adminCred)
    })
    const admin = await response.json()
    return admin
}


async function httpAddProduct (productDetails) {
const adminToken = localStorage.getItem("admin")
    try {
        const response = await fetch(`${API}/addnewproduct`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${adminToken}`
            },
            body: JSON.stringify(productDetails)
        })
        return await response.json()
    } catch (error) {
        return {
            ok: false
        }
    }  
}


async function httpGetAllProducts () {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/products`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpDeleteProduct (id) {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/product/${id}`, {
        method: "delete",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}


// Seller

async function httpCreateSeller (sellerDetails) {
    const adminToken = localStorage.getItem("admin")
    try {
        const response = await fetch(`${API}/createseller`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${adminToken}`
            },
            body: JSON.stringify(sellerDetails)
        })
        return await response.json()
    } catch (error) {
        return {
            ok: false
        }
    }
}


async function httpGetAllSellers () {
    const adminToken = localStorage.getItem("admin")
    const response =  await fetch(`${API}/sellers`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpGetSellerById (sellerId) {
    const adminToken = localStorage.getItem("admin")
    const response =  await fetch(`${API}/sellers/${sellerId}`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpGetSellerOrdersBySellerId (sellerId) {
    const adminToken = localStorage.getItem("admin")
    const response =  await fetch(`${API}/seller/sellerorders/${sellerId}`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpGetSellerTransactionsBySellerId (sellerId) {
    const adminToken = localStorage.getItem("admin")
    const response =  await fetch(`${API}/seller/sellertransactions/${sellerId}`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpDeleteSeller (id) {
    const adminToken = localStorage.getItem("admin")
    try {
        const response = await fetch(`${API}/seller/${id}`, {
            method: "delete",
            headers: {
                "auth-token": `${adminToken}`
            }
        })
        return await response.json()
    } catch (error) {
        return {
            ok: false
        }
    }
}

async function httpCreateSellerOrder (orderDetails, sellerId) {
    const adminToken = localStorage.getItem("admin")
    console.log(orderDetails)
    console.log(`${API}/createsellerorder/${sellerId}`)
    const response = await fetch(`${API}/createsellerorder/${sellerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${adminToken}`
        },
        body: JSON.stringify(orderDetails)
    })
    return await response.json()
}

async function httpUpdateSellerDemandOrder (DemandId) {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/updatesellerdemandorder/${DemandId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpGetAllSellersOrders () {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/sellerorders`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpUpdateSellerOrder (UpdateDetails, Id) {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/sellerorder/${Id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${adminToken}`
        },
        body: JSON.stringify(UpdateDetails)
    })
    return await response.json()
}

async function httpGetAllSellerReturnOrders () {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/sellerreturnorder`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

async function httpUpdateSellerReturnOrder (orderDetails, OrderId) {
    const adminToken = localStorage.getItem("admin");
    const response = await fetch(`${API}/sellerreturnorder/${OrderId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${adminToken}`
        },
        body: JSON.stringify(orderDetails)
    })
    return await response.json()
}

async function httpGetAllSellerDemandOrders () {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/sellerdemandorders`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}

//get all customers

async function httpGetAllCustomersDetails() {
    const adminToken = localStorage.getItem("admin")
    const response = await fetch(`${API}/customers`, {
        method: "get",
        headers: {
            "auth-token": `${adminToken}`
        }
    })
    return await response.json()
}



export {
    httpCreateAdmin,
    httpLoginAdmin,
    httpAddProduct,
    httpGetAllProducts,
    httpDeleteProduct,
    httpCreateSeller,
    httpUpdateSellerDemandOrder,
    httpGetAllSellers,
    httpGetSellerById,
    httpGetSellerOrdersBySellerId,
    httpGetSellerTransactionsBySellerId,
    httpDeleteSeller,
    httpCreateSellerOrder,
    httpGetAllSellersOrders,
    httpUpdateSellerOrder,
    httpGetAllSellerReturnOrders,
    httpUpdateSellerReturnOrder,
    httpGetAllSellerDemandOrders,
    httpGetAllCustomersDetails
}