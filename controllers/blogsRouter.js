const blogsRouter = require('express').Router();
const { pool } = require('../db/db');
const { v4: uuidv4 } = require('uuid');

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

module.exports = blogsRouter;
