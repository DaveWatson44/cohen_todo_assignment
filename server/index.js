const express = require('express');
const app = express();
const todoListRoutes = require('./routes/todoListRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use(todoListRoutes)


app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
