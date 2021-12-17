const express = require('express');
const router = express.Router();
const pg = require('../db/postgresquery');
const { createTodoListsSQL, getTodoListsSQL, updateTodoListSQL, deleteTodoListSQL, getTodoListAndTasksSQL } = require('../utils/todoListQueries');
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

		for(let todoList of todoLists){
			let todo = new TodoList(todoList.id, todoList.name)
			let tasks = await todo.tasks;
			let completedTasks = await todo.completedTasks;
	
			todoInfo.push({'id':todo.id, 'name': todo.name, 'tasks': tasks, 'completedTasks': completedTasks })

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
	const sql = updateTodoListSQL();
	const values = [req.body.id]
	let message = '';

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
	const values = [req.body.id]
	let message = '';

	try {
		await pg.query(sql, values)
		message = "Todo List deleted successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error deleting the record.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

module.exports = router;