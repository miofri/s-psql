const findUserByEmail = 'SELECT * FROM users WHERE email = $1';

//user router
const createUser =
	'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *';
const updatePasswordByEmail = 'UPDATE users SET password = $1 WHERE email = $2';

//blog router
const selectPostsByid = 'SELECT * FROM blogs WHERE user_id = ($1)::uuid';
// eslint-disable-next-line quotes
const jointTableBlogID_TagID = `SELECT b.id, b.title, b.body, b.date, b.user_id, b.created_at, COALESCE(jsonb_agg(jsonb_build_object('tag_id', t.id, 'tag_name', t.name)) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags FROM blogs b LEFT JOIN blog_tags bt ON b.id = bt.blog_id LEFT JOIN tags t ON t.id = bt.tag_id WHERE b.user_id = ($1)::uuid GROUP BY b.id ORDER BY b.date DESC;`;

const updateBlogById =
	'UPDATE blogs SET title = $1, body = $2, date = $3 WHERE id = $4 RETURNING *';
const deleteBlogById = 'DELETE FROM blogs WHERE id = $1';
//creating blog and tag
const createNewBlog =
	'INSERT INTO blogs (title, body, user_id) VALUES ($1, $2, $3) RETURNING id';
const insertTag =
	'INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id';
const getTagId = 'SELECT id FROM tags WHERE name = $1';
const insertBlogTag = 'INSERT INTO blog_tags (blog_id, tag_id) VALUES ($1, $2)';

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
	jointTableBlogID_TagID,
};
