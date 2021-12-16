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
    }
    
}