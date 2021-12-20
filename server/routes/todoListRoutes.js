const express = require('express');
const router = express.Router();
const pg = require('../db/postgresquery');
const { createTodoListsSQL, getTodoListsSQL, updateTodoListSQL, deleteTodoListSQL, getTodoListAndTasksSQL, updateTodosSQL } = require('../utils/todoListQueries');
const { getTasksSQL } = require('../utils/tasksQueries');
const TodoList  = require('../blueprints/todoList');

router.get('/todo_lists', async (req, res, next) => {
	const sql = getTodoListsSQL();
	let message = "There was an error retrieving the records.";

	try {
		const todos = await pg.query(sql)

        const todoLists = results.rows;
        
		res.status(200).send(todoLists);
	} catch(err) {
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.get('/todos_info', async (req, res, next) => {
	const todo_sql = getTodoListsSQL();

	let message = "There was an error retrieving the records.";

	try {
		const todos = await pg.query(todo_sql);

        const todoLists = todos.rows;

		let todoInfo = [];
		let values = [];
		
		for(let todoList of todoLists){
			let todo = new TodoList(todoList.id, todoList.name, todoList.is_completed)
			let tasks = await todo.tasks;
			let completedTasks = await todo.completedTasks;
			
			if(tasks.length != 0 && tasks.length == completedTasks.length && todo.isCompleted != true){
				todo.isCompleted = true;
				let updateData = {'id': todo.id, 'is_completed': todo.isCompleted}
				let sql = updateTodosSQL(updateData);
				for(val in updateData){
					let value = updateData[val];
					values.push(value);
				}
				pg.query(sql, values)
			}
	
			todoInfo.push({'id':todo.id, 'name': todo.name, 'tasks': tasks, 'completedTasks': completedTasks, 'isCompleted': todo.isCompleted })

		}

		res.status(200).send(todoInfo);
	} catch(err) {
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.post('/todo_lists', async (req, res, next) => {
	const sql = createTodoListsSQL();
	const values = [req.body.name]
	let message = '';

	try {
		await pg.query(sql, values)
		message = "Project added successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error adding the record. Please make sure the project name doesn't already exist.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.put('/todo_lists', async (req, res, next) => {
	const updateData = req.body;
	const sql = updateTodosSQL(updateData);
    const values = [];
    let message = '';

    for(val in updateData){
        let value = updateData[val];
        values.push(value);
    }

	try {
		await pg.query(sql, values)
		message = "Todo List updated successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error updating the record. Please make sure the Todo List name doesn't already exist.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.delete('/todo_lists', async (req, res, next) => {
    const sql = deleteTodoListSQL();
	const values = [req.query.id]
	let message = '';

	try {
		await pg.query(sql, values)
		message = "Todo List deleted successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error deleting the record.";
		console.log(err)
		res.status(400).send({
			error: err.code
		})
	}
});

module.exports = router;