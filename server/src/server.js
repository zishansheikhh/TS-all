const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const { getSellerId } = require('./helper-function/helper-functions')
const {mysqlConnect} = require('./services/mysql')

const PORT = 8000


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000',
        'https://leveranceoxygen.com'],
        credentials: true,
    }

})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)



    socket.on("add_balance_seller_acount", (data) => {
        socket.broadcast.emit("update_seller_account_balance", data)
    })

    socket.on("add_demand_from_seller", (data) => {
        const {quantity, SellerToken, Refill} = data;
        let SellerId = getSellerId(SellerToken)
        socket.broadcast.emit("update_seller_demand", {quantity, SellerId, Refill})
    })

    socket.on("add_seller_return_order", (data) => {
        const {SellerToken, orderToAdd, Refill} = data;
        let SellerId = getSellerId(SellerToken)
        socket.broadcast.emit("update_seller_return_orders_list", {SellerId, orderToAdd, Refill})
    })

    //seller notification
    socket.on("created_seller_order", (data) => {
        socket.broadcast.emit("update_seller_orders", data)
    })
    socket.on("created_seller_demand_order", (data) => {
        socket.broadcast.emit("update_seller_demand_orders", data)
    })
    socket.on("confirm_create_seller_order", (data) => {
        socket.broadcast.emit("confirm_create_seller_order_admin", data);
    })
    socket.on("cancel_create_seller_order", (data) => {
        socket.broadcast.emit("cancel_create_seller_order_admin", data);
    })

    socket.on("update_seller_order_status", (data) => {
        socket.broadcast.emit("update_order_status", data)
    })

    socket.on("update_seller_return_order_status", (data) => {
        socket.broadcast.emit("update_return_order_status", data)
    })
})

async function startServer () {
    await mysqlConnect()
    
    server.listen(PORT, () => {
        console.log(`server is now listening to port ${PORT}`)
    })
}

startServer()

