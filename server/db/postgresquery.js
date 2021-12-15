const { Pool } = require('pg')

//change db to ip to work on external devices
const connectionString = 'postgresql://postgres:password@db:5432/todolist'
const pool = new Pool({
    connectionString: connectionString,
})

module.exports = {
  query: (text, callback) => {
    return pool.query(text, callback)
  },
}