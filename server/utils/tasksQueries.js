module.exports = {

    getTasksSQL: function(){
        return 'SELECT * FROM tasks'
    },

    createTasksSQL: function(){
        return 'INSERT INTO tasks (todo_list_id, description, due_date, priority, is_completed) VALUES ($1, $2, $3, $4, $5)'
    },

    
    
}