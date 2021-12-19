// const { createTodoListsSQL, getTodoListsSQL, updateTodoListSQL, deleteTodoListSQL, getTodoListAndTasksSQL } = require('../utils/todoListQueries');
const { getTasksSQL, getCompletedTasksSQL } = require('../utils/tasksQueries');
const pg = require('../db/postgresquery');

module.exports = class TodoList {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    get tasks() {
        return this.getTasks();
    };

    get completedTasks() {
        return this.getCompletedTasks();
    };

    async getTasks() {
        const sql = getTasksSQL();
        const values = [this.id]

        try {
            const results = await pg.query(sql, values)
            const tasks = results.rows;

            return tasks;
        } catch (err) {
            console.log(err)
            return err
        }
    };

    async getCompletedTasks() {
        const sql = getCompletedTasksSQL();
        const values = [this.id]

        try {
            const results = await pg.query(sql, values)
            const tasks = results.rows;

            return tasks;
        } catch (err) {
            console.log(err)
            return err
        }
    };

}
