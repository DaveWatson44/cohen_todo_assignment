module.exports = {

    getTodoListsSQL: function(){
        return 'SELECT * FROM todo_lists'
    },

    createTodoListsSQL: function(){
        return 'INSERT INTO todo_lists (name) VALUES ($1)'
    },

    
}