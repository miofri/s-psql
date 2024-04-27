const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

const { pool } = require('./db/db');
const authRouter = require('./controllers/authRouter');
const usersRouter = require('./controllers/usersRouter');
const blogsRouter = require('./controllers/blogsRouter');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.get('/', (req, res) => {
	res.sendStatus(200);
});

module.exports = app;
