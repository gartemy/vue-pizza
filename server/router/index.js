const Router = require('express').Router
const customerController = require('../controllers/customer-controller')
const pizzaController = require('../controllers/pizza-controller')
const orderController = require('../controllers/order-controller')
const {body} = require('express-validator')
const loginMiddleware = require('../middlewares/login-middleware')

const router = new Router()

router.get('/pizzas', pizzaController.getPizzas)
router.get('/categories', pizzaController.getCategories)
router.get('/sortings', pizzaController.getSortings)
router.post('/login',
    body('email').isEmail(),
    customerController.login)
router.post('/verify',
    body('email').isEmail(),
    body('code').isLength({min: 4, max: 4}),
    customerController.verify)
router.post('/logout', customerController.logout)
router.get('/refresh', customerController.refresh)
router.get('/info', loginMiddleware, customerController.getCustomerInfo)
router.put('/name', loginMiddleware, customerController.setCustomerName)
router.put('/phone', loginMiddleware, customerController.setCustomerPhone)
router.put('/birthday', loginMiddleware, customerController.setCustomerBirthday)
router.post('/orders', loginMiddleware, orderController.makeOrder)
module.exports = router
