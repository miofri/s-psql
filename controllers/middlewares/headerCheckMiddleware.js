const jwt = require('jsonwebtoken');

const headerCheckMiddleware = (req, res, next) => {
	if (!req.headers.authorization) {
		next();
	}
	const authorizationHeader = req.headers.authorization.split(' ')[1];
	try {
		const jwtVerify = jwt.verify(
			authorizationHeader,
			process.env.JWT_SECRET_KEY
		);
		req.email = { email: jwtVerify.email };
		next();
	} catch (err) {
		console.error(err);
		next();
	}
};

module.exports = headerCheckMiddleware;
