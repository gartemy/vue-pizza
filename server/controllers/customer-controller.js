const customerService = require('../service/customer-service')
const {validationResult} = require('express-validator')

class CustomerController {
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({message: 'Некорректный email!'})
            }
            const {email} = req.body
            await customerService.login(email)
            return res.send('Письмо успешно отправлено!')
        } catch (e) {
            console.log(e)
        }
    }

    async verify(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()})
            }
            const {email, code} = req.body
            const customerData = await customerService.verify(email, code)
            res.cookie('refreshToken', customerData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(customerData)
        } catch (e) {
            console.log(e)
            return res.json({message: 'Неправильный код!'})
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies
            const token = await customerService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const customerData = await customerService.refresh(refreshToken);
            res.cookie('refreshToken', customerData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(customerData);
        } catch (e) {
            console.log(e)
            return res.json({message: 'Пустой resreshToken'})
        }
    }

    async getCustomerInfo(req, res) {
        try {
            const customerInfo = await customerService.getCustomerInfo(req.customer.customerId)
            return res.send(customerInfo)
        } catch(e) {
            console.log(e)
        }
    }

    async setCustomerName(req, res) {
        try {
            const {firstName} = req.body
            await customerService.setCustomerName(req.customer.customerId, firstName)
            return res.send('Имя успешно изменено!')
        } catch(e) {
            console.log(e)
        }
    }

    async setCustomerPhone(req, res) {
        try {
            const {phone} = req.body
            const result = await customerService.setCustomerPhone(req.customer.customerId, phone)
            return res.json(result)
        } catch(e) {
            console.log(e)
        }
    }

    async setCustomerBirthday(req, res) {
        try {
            const {birthday} = req.body
            await customerService.setCustomerBirthday(req.customer.customerId, birthday)
            return res.send('День рождения успешно добавлен!')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CustomerController()