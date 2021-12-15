const express = require('express');
const app = express();
const query = require('./db/postgresquery');
const { createProjectSQL, getProjectsSQL } = require('./utils/projectQueries');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/projects', async (req, res, next) => {
	const sql = getProjectsSQL();
	let message = "There was an error retrieving the records.";

	try {
		const results = await query.query(sql)

		res.status(200).send(results.rows);
	} catch(err) {
		console.log(err)
		res.status(400).send({
			message: message
		})
	}
});

app.post('/projects', async (req, res, next) => {
	const sql = createProjectSQL();
	const values = [req.body.name]
	let message = '';

	try {
		const results = await query.query(sql, values)
		
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

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
