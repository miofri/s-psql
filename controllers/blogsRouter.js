const blogsRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { pool } = require('../db/db');
const headerCheckMiddleware = require('./middlewares/headerCheckMiddleware');

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

blogsRouter.post('/newpost', headerCheckMiddleware, async (req, res, next) => {
	console.log(req.email);

	res.sendStatus(200);
});

blogsRouter.use(notAuthorizedMiddleware);

module.exports = blogsRouter;
