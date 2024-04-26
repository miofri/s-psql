const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db/db');
const morgan = require('morgan');
const authRouter = require('./controllers/authRouter');
const userRouter = require('./controllers/userRouter');
const blogRouter = require('./controllers/blogRouter');

require('dotenv').config();

app.use(express.static('build'));
app.use(express.json);
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post('/', (req, res) => {
	const { name, location } = req.body;
	res.status(200).send({
		message: `YOUR KEYS WERE ${name}, ${location}`,
	});
});

app.listen(post, () => console.log(`server started on port ${port}`));

module.exports = app;
