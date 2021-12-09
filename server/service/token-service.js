const jwt = require('jsonwebtoken')
const pool = require("../config");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const customerData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return customerData
        } catch(e) {
            console.log(e)
        }
    }

    validateRefreshToken(token) {
        try {
            const customerData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return customerData
        } catch(e) {
            console.log(e)
        }
    }

    async saveToken(customerId, refreshToken) {
        const tokenData = await pool.query('select customer_id from customers where customer_id = $1', [customerId])
        if (tokenData.rowCount !== 0) {
            return await pool.query('update customers set "refreshToken" = $1 where customer_id = $2', [refreshToken, customerId])
        }
        return await pool.query('insert into "customers" ("refreshToken") values ($1)', [refreshToken])
    }

    async removeToken(refreshToken) {
        const tokenData = await pool.query('update customers set "refreshToken" = $1 where "refreshToken" = $2', [null, refreshToken])
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await pool.query('select "refreshToken" from customers where "refreshToken" = $1', [refreshToken])
        return tokenData.rows[0].refreshToken
    }
}

module.exports = new TokenService()