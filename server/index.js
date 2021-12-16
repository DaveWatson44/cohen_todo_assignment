const express = require('express');
const app = express();
const todoListRoutes = require('./routes/todoListRoutes');
const tasksRoutes = require('./routes/tasksRoutes');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(todoListRoutes)
app.use(tasksRoutes)

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
