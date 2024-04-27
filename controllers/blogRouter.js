const blogRouter = require('express').Router();
const { pool } = require('../db/db');
const { v4: uuidv4 } = require('uuid');

blogRouter.get('/:userid', async (req, res) => {
	const query = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [
		req.params.userid,
	]);
	res.json(`data: ${query.rows}`);
});

module.exports = blogRouter;
