const pool = require('../config')
const mailService = require('./mail-service')
const tokenService = require('./token-service')

class CustomerService {
    async login(email) {
        const secretCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const candidate = await pool.query('select email from customers where email = $1', [email])
        if (candidate.rowCount == 0) {
            await pool.query('insert into "customers" ("email") values ($1) RETURNING customer_id', [email])
        }
        let customerId = await pool.query('select customer_id from customers where email = $1', [email])
        customerId = customerId.rows[0].customer_id
        await pool.query('insert into "customer_code" ("email", "secret_code", "customer_id") values ($1, $2, $3) RETURNING code_id', [email, secretCode, customerId])
        await mailService.sendLoginMail(email, secretCode)
    }

    async verify(email, code) {
        let secretCode = await pool.query('select cc.code_id, cc.secret_code from customer_code cc INNER JOIN customers cu ON cc.customer_id = cu.customer_id and cc.email = $1 ORDER BY cc.code_id DESC', [email])
        if (code != secretCode.rows[0].secret_code) {
            return null
        }
        let customerId = await pool.query('select customer_id from customers where email = $1', [email])
        customerId = customerId.rows[0].customer_id
        const tokens = tokenService.generateTokens({customerId, email})
        await tokenService.saveToken(customerId, tokens.refreshToken)
        return tokens
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            return null
        }
        const customerData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!customerData || !tokenFromDb) {
            return null
        }
        const customerId = customerData.customerId
        let email = await pool.query('select email from customers where customer_id = $1', [customerData.customerId])
        email = email.rows[0].email
        const tokens = tokenService.generateTokens({customerId, email})
        await tokenService.saveToken(customerId, tokens.refreshToken)
        return tokens
    }

    async getCustomerInfo(id) {
        const customerInfo = await pool.query('select * from customers where customer_id = $1', [id])
        return customerInfo
    }

    async setCustomerName(id, name) {
        await pool.query('update customers set first_name = $1 WHERE customer_id = $2', [name, id])
    }

    async setCustomerPhone(id, phone) {
        const isUnique = await pool.query('select phone_number from customers where phone_number = $1', [phone])
        if (isUnique.rowCount === 0) {
            await pool.query('update customers set phone_number = $1 WHERE customer_id = $2', [phone, id])
        } else {
            return {error: 'Такой номер телефона уже занят!'}
        }
    }

    async setCustomerBirthday(id, birthday) {
        await pool.query('update customers set birthday = $1 WHERE customer_id = $2', [birthday, id])
    }
}

module.exports = new CustomerService()