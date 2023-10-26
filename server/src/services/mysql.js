const mysql = require('mysql')


const db = mysql.createPool({
    host : '127.0.0.1',
    user:'root',
    password:'Xperia!2#4',
    database: 'leverance_demo_db',
    connectionLimit: 200
})


function mysqlConnect () {
    db.getConnection((err) => {
        if (err) throw err
        console.log('mySQL is now connected')
    })
}

module.exports = {
    db,
    mysqlConnect
};