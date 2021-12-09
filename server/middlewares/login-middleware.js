const tokenService = require('../service/token-service')

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return res.status(400)
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return res.status(400)
        }

        const customerData = tokenService.validateAccessToken(accessToken)
        if (!customerData) {
            return res.status(400)
        }

        req.customer = customerData
        next()
    } catch(e) {
        res.status(400)
    }
}