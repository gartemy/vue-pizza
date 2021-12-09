const customerService = require('../service/customer-service')
const {validationResult} = require('express-validator')

class CustomerController {
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()})
            }
            const {email} = req.body
            await customerService.login(email)
            return res.send('Успешно!')
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
            return res.status(400)
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
        }
    }
}

module.exports = new CustomerController()