module.exports = {

    getTasksSQL: function(){
        return 'SELECT * FROM tasks'
    },

    createTaskSQL: function(){
        return 'INSERT INTO tasks (todo_list_id, name, description, due_date, priority, is_completed) VALUES ($1, $2, $3, $4, $5, $6)'
    },

    updateTaskSQL: function(records){
        let sql = 'UPDATE tasks SET ';
        const fields = Object.keys(records);
        const whereClause = `WHERE id = $1;`
        
        for(let i=1; i <fields.length; i++){
            if(i+1 == fields.length){
                sql += `${fields[i]} = $${i+1} `
            } else{
                sql += `${fields[i]} = $${i+1}, `
            }
        }

        sql += whereClause;
       
        return sql
    },

    deleteTaskSQL: function(){
        return 'DELETE FROM tasks WHERE id = $1';
    },

    deleteTodoTasksSQL: function(){
        return 'DELETE FROM tasks WHERE todo_list_id = $1';
    }

    
    
}