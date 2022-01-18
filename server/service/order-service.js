const pool = require('../config')

class OrderService {
    async makeOrder(customerId, orderInfo, totalPrice) {
        let address= ''
        if (orderInfo.flat) {
            address = `${orderInfo.street}, д. ${orderInfo.house}, кв. ${orderInfo.flat}, подъезд ${orderInfo.door}, этаж ${orderInfo.stage}`
        } else {
            address = `${orderInfo.street}, д. ${orderInfo.house}`
        }
        const date = new Date()
        await pool.query('insert into orders ("address", "comment", "date", "totalPrice", "customer_id") values ($1, $2, $3, $4, $5)', [address, orderInfo.comment, date, totalPrice, customerId])
        const order = await pool.query('select order_id from orders where customer_id = $1 ORDER BY order_id DESC', [customerId])
        return order.rows[0].order_id
    }

    async setPizzas(orderId, cartItems) {
        for (let item of cartItems) {
            await pool.query('insert into orders_pizzas values ($1, $2, $3, $4, $5, $6)', [orderId, item.id, item.type, item.size, item.price, item.quantity])
        }
    }
}

module.exports = new OrderService()