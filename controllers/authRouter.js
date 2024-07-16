const authRouter = require('express').Router();
const { pool } = require('../db/db');
const jwt = require('jsonwebtoken');

const auth_mw = require('./middlewares/auth_mw');

// authRouter.post('/login', (req, res) => {
// 	console.log('Request Body:', req.body); // Add logging
// 	res.json({ message: 'Login route hit successfully', body: req.body }); // Respond immediately
// });

authRouter.post('/login', auth_mw, async (req, res) => {
	const token = jwt.sign(
		{
			email: req.user.email.toLowerCase(),
			sub: req.user.sub,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '30m' }
	);

	res.json({ token: token, user: req.user });
});

module.exports = authRouter;
