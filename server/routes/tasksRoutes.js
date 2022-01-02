const express = require('express');
const router = express.Router();
const pg = require('../db/postgresquery');
const { createTaskSQL, getTasksSQL, updateTaskSQL, deleteTaskSQL } = require('../utils/tasksQueries');

router.get('/tasks', async (req, res, next) => {
	const sql = getTasksSQL();
	const values = [req.query.todoListId]
	let message = "There was an error retrieving the records.";

	try {
		const results = await pg.query(sql, values)
		const tasks = results.rows;

		res.status(200).send(tasks);
	} catch (err) {
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.post('/tasks', async (req, res, next) => {
	const sql = createTaskSQL();
	const values = [req.body.todoListId, req.body.name, req.body.description, req.body.dueDate, req.body.priority, req.body.isCompleted];
	let message = '';

	try {
		await pg.query(sql, values)
		message = "Task added successfully.";
		res.status(200).send({ message: message });
	} catch (err) {
		if (err.code == '23505') {
			message = "Task name already exists.";
			console.log(err)
			res.status(400).send({
				message: message
			})
		} else {
			message = "There was an error adding the record. Please make sure the task name doesn't already exist.";
			console.log(err)
			res.status(400).send({
				message: message
			})
		}
	}
});

router.put('/tasks', async (req, res, next) => {
	const updateData = req.body;
	const values = [];
	const sql = updateTaskSQL(updateData);
	let message = '';

	for (val in updateData) {
		let value = updateData[val];
		values.push(value);
	}

	try {
		await pg.query(sql, values)
		message = "Task updated successfully.";
		res.status(200).send({ message: message });
	} catch (err) {
		message = "There was an error editing the record.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	};
});

router.delete('/tasks', async (req, res, next) => {
	const sql = deleteTaskSQL();
	const values = [req.query.id]
	try {
		await pg.query(sql, values)
		message = "Task deleted successfully.";
		res.status(200).send({ message: message });
	} catch (err) {
		message = "There was an error deleting the record.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	};
});


module.exports = router;