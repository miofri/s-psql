const usersRouter = require('express').Router();
const { pool } = require('../db/db');
const bcrypt = require('bcrypt');
const headerCheck_mw = require('./middlewares/headerCheck_mw');
const saltRounds = 10;
const queries = require('./queries');

usersRouter.post('/signup', async (req, res, next) => {
	bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
		if (error) {
			next(error);
		}
		try {
			const query = await pool.query(queries.createUser, [
				req.body.email,
				hash,
			]);
			res.status(201).json({ message: 'Registration successful' });
		} catch (error) {
			console.error('Error executing query:', error);
			res
				.status(500)
				.json({ message: 'Internal server error: Registration failed' });
		}
	});
});

usersRouter.patch('/changepassword', headerCheck_mw, async (req, res, next) => {
	bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
		if (error) {
			next(error);
		}
		try {
			const query = await pool.query(queries.updatePasswordByEmail, [
				hash,
				req.user.email,
			]);
			res.status(200).json({ message: 'password changed successfully' });
		} catch (error) {
			next(error);
		}
	});
});
module.exports = usersRouter;
