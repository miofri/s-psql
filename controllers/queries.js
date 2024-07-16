const findUserByEmail = `SELECT * FROM users WHERE email = $1`;

//user router
const createUser = `INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`;
const updatePasswordByEmail = `UPDATE users SET password = $1 WHERE email = $2`;

//blog router
const selectPostsByid = `SELECT * FROM blogs WHERE user_id = ($1)::uuid`;
const jointTableBlogID_TagID = `SELECT * from blogs WHERE blogs.user_id = ($1)::uuid JOIN blog_tags on blog_tags.blog_id = blogs.id join tags on tags.id = blog_tags.tag_id `;
const updateBlogById = `UPDATE blogs SET title = $1, body = $2, date = $3 WHERE id = $4 RETURNING *`;
const deleteBlogById = `DELETE FROM blogs WHERE id = $1`;
//creating blog and tag
const createNewBlog = `INSERT INTO blogs (title, body, user_id) VALUES ($1, $2, $3) RETURNING id`;
const insertTag = `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`;
const getTagId = `SELECT id FROM tags WHERE name = $1`;
const insertBlogTag = `INSERT INTO blog_tags (blog_id, tag_id) VALUES ($1, $2)`;

module.exports = {
	findUserByEmail,
	createUser,
	updatePasswordByEmail,
	selectPostsByid,
	createNewBlog,
	updateBlogById,
	deleteBlogById,
	insertTag,
	getTagId,
	insertBlogTag,
};
