const express = require('express');
const app = express();
const todoListRoutes = require('./routes/todoListRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const cors = require('cors');

const port = 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS, preflightContinue": false');
    next();
});

app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080'
    ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(todoListRoutes)
app.use(tasksRoutes)

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
