const jwt = require('jsonwebtoken');

const headerCheck_mw = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'No token' });
	}
	const authorizationHeader = req.headers.authorization.split(' ')[1];
	try {
		const jwtVerify = jwt.verify(
			authorizationHeader,
			process.env.JWT_SECRET_KEY
		);
		req.user = { email: jwtVerify.email };
		next();
	} catch (error) {
		return res.status(401).json({ message: 'token expired' });
	}
};

module.exports = headerCheck_mw;
