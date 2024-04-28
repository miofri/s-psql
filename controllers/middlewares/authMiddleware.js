const authenticateUserMiddleware = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const found = await pool.query(`SELECT * FROM users WHERE email = $1`, [
		email,
	]);
	if (found.rows.length === 0) {
		return res.status(404).json({ message: 'User not found' });
	}

	const passwordHash = found.rows[0].password;
	const match = await bcrypt.compare(password, passwordHash);
	if (!match) {
		return res.status(401).json({ message: 'Login failed - unathourized' });
	}

	req.user = { email: found.rows[0].email };
};

module.exports = authenticateUserMiddleware;
