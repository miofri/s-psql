const authRouter = require('express').Router();
const { pool } = require('../db/db');
const jwt = require('jsonwebtoken');

const auth_mw = require('./middlewares/auth_mw');

authRouter.post('/login', auth_mw, async (req, res) => {
	const token = jwt.sign(
		{
			email: req.user.email.toLowerCase(),
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '30m' }
	);

	res.json({ token: token, user: req.user });
});

module.exports = authRouter;
