const convertCamelToSnake = require('./camelToSnakeCase')
module.exports = {

    getTaskByNameSQL: function(){
      return 'SELECT name FROM tasks WHERE name = $1 AND todo_list_id = $2';
    },

    getTasksSQL: function () {
        return `SELECT id, todo_list_id AS "todoListId", name, description, to_char( due_date, 'YYYY-MM-DD') AS "dueDate", priority, is_completed AS "isCompleted" FROM tasks WHERE todo_list_id = $1 ORDER BY is_completed, tasks.id`;
    },

    getCompletedTasksSQL() {
        return `SELECT id, todo_list_id AS "todoListId", name, description, to_char( due_date, 'YYYY-MM-DD') AS "dueDate", priority, is_completed AS "isCompleted" FROM tasks WHERE todo_list_id = $1 and is_completed = 't'`;
    },

    createTaskSQL: function () {
        return 'INSERT INTO tasks (todo_list_id, name, description, due_date, priority, is_completed) VALUES ($1, $2, $3, $4, $5, $6)';
    },

    updateTaskSQL: function (records) {
        let sql = 'UPDATE tasks SET ';
        let fields = Object.keys(records);
        const whereClause = `WHERE id = $1;`

        for (let i = 1; i < fields.length; i++) {
            const field = fields[i];
            
            if (i + 1 == fields.length) {
                sql += `${convertCamelToSnake(field)} = $${i + 1} `;
            } else {
                sql += `${convertCamelToSnake(field)} = $${i + 1}, `;
            }
        }

        sql += whereClause;

        return sql;
    },

    deleteTaskSQL: function () {
        return 'DELETE FROM tasks WHERE id = $1';
    },

    deleteTodoTasksSQL: function () {
        return 'DELETE FROM tasks WHERE todo_list_id = $1';
    }
}