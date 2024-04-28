const blogsRouter = require('express').Router();
const { pool } = require('../db/db');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const notAuthorizedMiddleware = (req, res, next) => {
	res.status(401).json({ message: 'Not authorized!' });
};

blogsRouter.get('/:userid', async (req, res) => {
	try {
		const query = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [
			req.params.userid,
		]);
		res.json(query.rows);
	} catch (error) {
		console.error('Error executing query:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

blogsRouter.post('/newpost', async (req, res, next) => {
	if (!req.headers.authorization) {
		next();
	}
	const authorizationHeader = req.headers.authorization.split(' ')[1];
	try {
		const jwtVerify = jwt.verify(
			authorizationHeader,
			process.env.JWT_SECRET_KEY
		);
		console.log(jwtVerify);
		res.json({ message: 'authorized' });
	} catch (err) {
		console.error(err);
		next();
	}
});

blogsRouter.use(notAuthorizedMiddleware);

module.exports = blogsRouter;
