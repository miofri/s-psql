const blogsRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { pool } = require('../db/db');
const headerCheck_mw = require('./middlewares/headerCheck_mw');
const queries = require('./queries');

const notAuthorizedMiddleware = (req, res, next) => {
	res.status(401).json({ message: 'Not authorized!' });
	next();
};

blogsRouter.get('/post/:userid', async (req, res) => {
	try {
		const query = await pool.query(queries.selectPostsByid, [
			req.params.userid,
		]);
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
});

blogsRouter.post('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const emailQuery = await pool.query(queries.findUserByEmail, [
			req.user.email,
		]);
		const query = await pool.query(queries.createNewBlog, [
			req.body.title,
			req.body.body,
			emailQuery?.rows[0].id,
		]);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

blogsRouter.put('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const query = await pool.query(queries.updateBlogById, [
			req.body.title,
			req.body.body,
			new Date(),
			req.body.post_id,
		]);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const query = await pool.query(queries.deleteBlogById, [blog_id]);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});
blogsRouter.use(notAuthorizedMiddleware);

module.exports = blogsRouter;
