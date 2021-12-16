const express = require('express');
const router = express.Router();
const query = require('../db/postgresquery');
const { createTaskSQL, getTasksSQL, updateTaskSQL, deleteTaskSQL } = require('../utils/tasksQueries');

router.get('/tasks', async (req, res, next) => {
	const sql = getTasksSQL();
	let message = "There was an error retrieving the records.";

	try {
		const results = await query.query(sql)
        const tasks = results.rows;

		res.status(200).send(tasks);
	} catch(err) {
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.post('/tasks', async (req, res, next) => {
	const sql = createTaskSQL();
	const values = [req.body.todo_list_id, req.body.name, req.body.description, req.body.due_date, req.body.priority, req.body.is_completed];
	let message = '';

	try {
		await query.query(sql, values)
		message = "Task added successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error adding the record. Please make sure the task name doesn't already exist.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

router.put('/tasks', async (req, res, next) => {
    const updateData = req.body;
    const values = [];
    const sql = updateTaskSQL(updateData);
    let message = '';

    for(val in updateData){
        let value = updateData[val];
        values.push(value);
    }

	try {
		await query.query(sql, values)
		message = "Task updated successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error editing the record.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	};
});

router.delete('/tasks', async (req, res, next) => {
    const sql = deleteTaskSQL();
    const values = [req.body.id]

    try {
		await query.query(sql, values)
		message = "Task deleted successfully.";
		res.status(200).send({message: message});
	} catch(err) {
		message = "There was an error deleting the record.";
		console.log(err)
		res.status(400).send({
			message: message
		})
	};
});


module.exports = router;