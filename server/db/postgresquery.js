const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:password@db:5432/todolist'
const pool = new Pool({
    connectionString: connectionString,
})

module.exports = {
  query: (text, callback) => {
    return pool.query(text, callback)
  },
}