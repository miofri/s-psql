const authRouter = require('express').Router();
const { pool } = require('../db/db');
const jwt = require('jsonwebtoken');

const authenticateUserMiddleware = require('./middlewares/authMiddleware');

authRouter.post('/login', authenticateUserMiddleware, async (req, res) => {
	const token = jwt.sign(
		{
			email: req.user.email,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '30m' }
	);

	res.json({ token });
});

module.exports = authRouter;
