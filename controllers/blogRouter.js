const blogRouter = require('express').Router();
const { pool } = require('../db/db');

blogRouter.get('/:userid', (req, res) => {
	const query = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [req.])
});
