module.exports = {

    getProjectsSQL: function(){
        return 'SELECT * FROM projects'
    },

    createProjectSQL: function(){
        return 'INSERT INTO projects (name) VALUES ($1)'
    }
}