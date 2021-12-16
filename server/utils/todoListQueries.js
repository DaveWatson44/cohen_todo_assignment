module.exports = {

    getProjectsSQL: function(){
        return 'SELECT * FROM todo_lists'
    },

    createProjectSQL: function(){
        return 'INSERT INTO todo_lists (name) VALUES ($1)'
    },

    
}