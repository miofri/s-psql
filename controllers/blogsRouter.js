const blogsRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { pool } = require('../db/db');
const headerCheck_mw = require('./middlewares/headerCheck_mw');
const queries = require('./queries');

const notAuthorizedMiddleware = (req, res, next) => {
	return res.status(401).json({ message: 'Not authorized!' });
};

blogsRouter.get('/post/:userid', headerCheck_mw, async (req, res, next) => {
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
		const query = await pool.query(queries.createNewBlog, [
			req.body.title,
			req.body.body,
			req.body.user_id,
		]);
		res.status(200).json({ message: 'post created successfully' });
	} catch (error) {
		next(error);
	}
});

blogsRouter.patch('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const query = await pool.query(queries.updateBlogById, [
			req.body.title,
			req.body.body,
			new Date(),
			req.body.post_id,
		]);
		res.status(200).json({ message: 'patch completed successfully' });
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/post', headerCheck_mw, async (req, res, next) => {
	try {
		const query = await pool.query(queries.deleteBlogById, [req.body.post_id]);
		res.status(200).json({ message: 'post deleted' });
	} catch (error) {
		next(error);
	}
});

blogsRouter.use(notAuthorizedMiddleware);

module.exports = blogsRouter;
