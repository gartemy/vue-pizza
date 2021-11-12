const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./db')
const mailer = require('./mailer')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 8081

app.get('/pizzas', async (req, res) => {

    try {
        const pizzas = await pool.query('SELECT p.pizza_id, STRING_AGG(DISTINCT po.img, \',\' ORDER BY po.img) as img, p.title, pc.category_id, p.rating, \n' +
            'STRING_AGG(DISTINCT o.type, \',\' ORDER BY o.type) as types, \n' +
            'STRING_AGG(DISTINCT o.size::character varying, \',\') as sizes, \n' +
            'STRING_AGG(DISTINCT po.price::character varying, \',\') as prices\n' +
            'FROM pizzas p \n' +
            'INNER JOIN pizzas_categories pc ON p.pizza_id = pc.pizza_id\n' +
            'INNER JOIN pizzas_options po ON p.pizza_id = po.pizza_id\n' +
            'INNER JOIN options o ON po.option_id = o.option_id\n' +
            'GROUP BY p.pizza_id, pc.category_id')
        res.send(pizzas.rows)
    } catch (e) {
        console.error(e.message);
    }

})

app.get('/categories', async (req, res) => {

    try {
        const categories = await pool.query('select * from "categories"')
        res.send(categories.rows)
    } catch (e) {
        console.error(e.message);
    }

})

app.get('/sortings', async (req, res) => {

    try {
        const sortings = await pool.query('select * from "sortings"')
        res.send(sortings.rows)
    } catch (e) {
        console.error(e.message);
    }

})

app.post('/email', async (req, res) => {

    const secretCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try {
        const email = await pool.query('select user_email from users where user_email = $1', [req.body.email])

        if (email.rowCount == 0) {
            await pool.query('insert into "users" ("user_email") values ($1) RETURNING id', [req.body.email])
        }

        const userId = await pool.query('select id from users where user_email = $1', [req.body.email])

        await pool.query('insert into "user_code" ("user_email", "secret_code", "user_id") values ($1, $2, $3) RETURNING id', [req.body.email, secretCode, userId.rows[0].id])
    } catch (e) {
        console.log(e.message)
    }

    const message = {
        to: req.body.email,
        subject: `${secretCode} - код для входа на сайт vue-pizza. Никому не говорите код.`
    }

    mailer(message)
    res.send(message)
})

app.post('/verify', async (req, res) => {

    try {
        let secretCode = await pool.query('select uc.id, uc.secret_code from user_code uc INNER JOIN users us ON uc.user_id = us.id and uc.user_email = $1 ORDER BY uc.id DESC', [req.body.email])
        if (req.body.code == secretCode.rows[0].secret_code) {
            console.log('Успешная авторизация!')
        } else {
            console.log('Неправильный код!')
        }
    } catch (e) {
        console.log(e.message)
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})