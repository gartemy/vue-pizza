require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use('/api', router)

const PORT = process.env.PORT || 5000

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()






