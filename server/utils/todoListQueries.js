module.exports = {

    getTodoListsSQL: function(){
        return 'SELECT * FROM todo_lists'
    },

    createTodoListsSQL: function(){
        return 'INSERT INTO todo_lists (name) VALUES ($1)'
    },

    updateTodoListSQL: function(){
        return `UPDATE todo_lists SET name = $2 WHERE id = $1`
    },

    deleteTodoListSQL: function(){
        return 'DELETE FROM todo_lists WHERE id = $1'
    },

    getTodoListAndTasksSQL: function(){
        return `SELECT  todo_lists.name, count(tasks.*)
        FROM todo_lists 
        LEFT JOIN tasks ON tasks.todo_list_id = todo_lists.id
        GROUP BY 1;`
    }
    
}