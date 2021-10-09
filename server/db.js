const pg = require('pg-pool')

const pool = new pg({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'vue_pizza'
})

module.exports = pool;


