const usersRouter = require('express').Router();
const { pool } = require('../db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

usersRouter.post('/signup', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		bcrypt.hash(password, saltRounds, async function (err, hash) {
			const query = await pool.query(
				`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
				[email, hash]
			);
			console.log(query);
			res.sendStatus(201);
		});
	} catch (error) {
		console.error('Error executing query:', error);
		res
			.status(500)
			.json({ message: 'Internal server error: Registration failed' });
	}
});
module.exports = usersRouter;
