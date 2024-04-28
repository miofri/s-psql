const findUserByEmail = `SELECT * FROM users WHERE email = $1`;

//user router
const createUser = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;
const updatePasswordByEmail = `UPDATE users SET password = $1 WHERE email = $2`;

//blog router
const selectPostsByid = `SELECT * FROM blogs WHERE user_id = $1`;
const createNewBlog = `INSERT INTO blogs (title, body, user_id) VALUES ($1, $2, $3) RETURNING *`;
const updateBlogById = `UPDATE blogs SET title = $1, body = $2, date = $3 WHERE id = $4 RETURNING *`;
const deleteBlogById = `DELETE FROM blogs WHERE id = $1`;

module.exports = {
	findUserByEmail,
	createUser,
	updatePasswordByEmail,
	selectPostsByid,
	createNewBlog,
	updateBlogById,
	deleteBlogById,
};
