module.exports = {

    getTodoListsSQL: function(){
        return 'SELECT * FROM todo_lists'
    },

    createTodoListsSQL: function(){
        return 'INSERT INTO todo_lists (name) VALUES ($1)'
    },

    // updateTodoListSQL: function(){
    //     return `UPDATE todo_lists SET name = $2 WHERE id = $1`
    // },

    updateTodosSQL: function(records){
        console.log(records)
        let sql = 'UPDATE todo_lists SET ';
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