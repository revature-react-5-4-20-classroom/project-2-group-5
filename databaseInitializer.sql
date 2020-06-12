--Delete tables if they exist for a fresh start--
DROP TABLE IF EXISTS users, posts, subscriptions, comments, messages;

--Create the Tables--
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    alias text,
    role text NOT NULL
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    author int NOT NULL REFERENCES users(user_id),
    date_posted int NOT NULL,
    title text,
    content text NOT NULL
);

CREATE TABLE subscriptions(
    subscription_id SERIAL PRIMARY KEY,
    subscribee int NOT NULL REFERENCES users(user_id),
    subscriber int NOT NULL REFERENCES users(user_id),
    blocked boolean NOT NULL 
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    post_id int NOT NULL REFERENCES posts(post_id),
    author int NOT NULL REFERENCES users(user_id),
    content text NOT NULL
);

CREATE TABLE messages(
    message_id SERIAL PRIMARY KEY,
    author int NOT NULL REFERENCES users(user_id),
    receiver int NOT NULL REFERENCES users(user_id),
    content text NOT NULL
);



--Initialize some data--
INSERT INTO users(username, password, alias, role) values
('admin', 'password', NULL, 'admin'),
('user', 'user', 'GUEST', 'user'),
('testUser', '12345', 'TeStInG', 'user');

INSERT INTO posts(author, date_posted, title, content) values 
((SELECT user_id FROM users WHERE username = 'admin'), 20200906, 'Initializing Post', 'Initial Post from the database initialization.');

INSERT INTO subscriptions(subscribee, subscriber, blocked) values
((SELECT user_id FROM users WHERE username = 'admin'), (SELECT user_id FROM users WHERE username = 'user'), FALSE),
((SELECT user_id FROM users WHERE username = 'testUser'), (SELECT user_id FROM users WHERE username = 'user'), TRUE);

INSERT INTO comments(post_id, author, content) values
(1, (SELECT user_id FROM users WHERE username = 'user'), 'FIRST!');

INSERT INTO messages(author, receiver, content) values
((SELECT user_id FROM users WHERE username = 'admin'), (SELECT user_id FROM users WHERE username = 'user'), 'HELLO USER')
