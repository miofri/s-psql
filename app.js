const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

const { pool } = require('./db/db');
const authRouter = require('./controllers/authRouter');
const usersRouter = require('./controllers/usersRouter');
const blogsRouter = require('./controllers/blogsRouter');

// app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

//for supabase
app.get('/auth/confirm', async function (req, res) {
	const token_hash = req.query.token_hash;
	const type = req.query.type;
	const next = req.query.next ?? '/';

	if (token_hash && type) {
		const supabase = createClient({ req, res });
		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			res.redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with some instructions
	res.redirect(303, '/auth/auth-code-error');
});

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});
module.exports = app;
