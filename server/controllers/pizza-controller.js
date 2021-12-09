const pool = require('../config')

class PizzaController {
    async getPizzas(req, res) {
        try {
            const pizzas = await pool.query(`SELECT p.pizza_id,
                                                    po.img,
                                                    p.title,
                                                    pc.category_id,
                                                    p.rating,
                                                    o.option as options,
                                                    po.prices
                                             FROM pizzas p
                                                      INNER JOIN pizzas_categories pc ON p.pizza_id = pc.pizza_id
                                                      INNER JOIN pizzas_options po ON p.pizza_id = po.pizza_id
                                                      INNER JOIN options o ON po.option_id = o.option_id`)
            res.send(pizzas.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await pool.query('select * from "categories"')
            res.send(categories.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async getSortings(req, res) {
        try {
            const sortings = await pool.query('select * from "sortings"')
            res.send(sortings.rows)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new PizzaController()