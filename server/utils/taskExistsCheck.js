const { getTaskByNameSQL } = require('../utils/tasksQueries');
const pg = require('../db/postgresquery');

taskExistsCheck = async function(taskName, todoListId){
    const sql = getTaskByNameSQL();
    const trimmedTaskName = taskName.trim();
	const values = [trimmedTaskName, todoListId]

    const results = await pg.query(sql, values)
	const tasks = results.rows;

    if(tasks.length < 1){
        return false
    } else{
        return true
    }
}

module.exports = taskExistsCheck;