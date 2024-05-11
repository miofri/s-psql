-- Initial tables for the blogs project.
-- Each user can have many blogs, and be followed/follows other users.
-- User table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(60) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	first_name VARCHAR(50),
	last_name VARCHAR(50)
);

-- Blog table, cascade delete so that when user is deleted, blogs are also deleted.
CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	body TEXT,
	date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	user_id INT REFERENCES users(id) ON
	DELETE
		CASCADE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---- Followers table, cascade delete so when user is deleted, any follow relationship is deleted.
CREATE TABLE followers (
	follower_id INT,
	followee_id INT,
	PRIMARY KEY (follower_id, followee_id),
	FOREIGN KEY (follower_id) REFERENCES users(id) ON
	DELETE
		CASCADE,
		FOREIGN KEY (followee_id) REFERENCES users(id) ON
	DELETE
		CASCADE
);

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
);
