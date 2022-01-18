const orderService = require('../service/order-service')
const mailService = require('../service/mail-service')

class OrderController {
    async makeOrder(req, res) {
        try {
            const customerId = req.customer.customerId
            const {orderInfo, totalPrice, cartItems} = req.body
            const orderId = await orderService.makeOrder(customerId, orderInfo, totalPrice)
            await orderService.setPizzas(orderId, cartItems)
            await mailService.sendOrderMail(req.customer.email, orderId)
            return res.send('Заказ подтверждён')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new OrderController()