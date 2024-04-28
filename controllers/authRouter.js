const authRouter = require('express').Router();
const { pool } = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticateUserMiddleware = require('./middlewares/authMiddleware');

//authRouter.get('/:userid', (req, res) => {});

authRouter.post('/login', authenticateUserMiddleware, async (req, res) => {
	const token = jwt.sign(
		{
			email: found.rows[0].email,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '30m' }
	);

	res.json({ token });
});

module.exports = authRouter;
