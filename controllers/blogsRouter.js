const blogsRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { pool } = require('../db/db');
const headerCheck_mw = require('./middlewares/headerCheck_mw');

const notAuthorizedMiddleware = (req, res, next) => {
	res.status(401).json({ message: 'Not authorized!' });
	next();
};

blogsRouter.get('/post/:userid', async (req, res) => {
	try {
		const query = await pool.query(`SELECT * FROM blogs WHERE user_id = $1`, [
			req.params.userid,
		]);
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
});

blogsRouter.post('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const emailQuery = await pool.query(
			`SELECT * FROM users WHERE email = $1`,
			[req.user.email]
		);
		const query = await pool.query(
			`INSERT INTO blogs (title, body, user_id) VALUES ($1, $2, $3) RETURNING *`,
			[req.body.title, req.body.body, emailQuery?.rows[0].id]
		);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

blogsRouter.put('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const findBlog = await pool.query(
			`UPDATE blogs SET title = $1, body = $2, date = $3 WHERE id = $4 RETURNING *`,
			[req.body.title, req.body.body, new Date(), req.body.post_id]
		);
		console.log(findBlog.rows);

		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const query = await pool.query(`DELETE FROM blogs WHERE id = $1`, [
			blog_id,
		]);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});
blogsRouter.use(notAuthorizedMiddleware);

module.exports = blogsRouter;
