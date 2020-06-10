--Delete tables if they exist for a fresh start--
DROP TABLE IF EXISTS users, posts, subscriptions, comments, messages;

--Create the Tables--
CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    alias text,
    role text NOT NULL
);

CREATE TABLE posts(
    postId SERIAL PRIMARY KEY,
    author int NOT NULL REFERENCES users(userId),
    datePosted int NOT NULL,
    title text,
    content text NOT NULL
);

CREATE TABLE subscriptions(
    subscriptionId SERIAL PRIMARY KEY,
    subscribee int NOT NULL REFERENCES users(userId),
    subscriber int NOT NULL REFERENCES users(userId),
    blocked boolean NOT NULL 
);

CREATE TABLE comments(
    commentId SERIAL PRIMARY KEY,
    postId int NOT NULL REFERENCES posts(postId),
    author int NOT NULL REFERENCES users(userId),
    content text NOT NULL
);

CREATE TABLE messages(
    messageId SERIAL PRIMARY KEY,
    author int NOT NULL REFERENCES users(userId),
    receiver int NOT NULL REFERENCES users(userId),
    content text NOT NULL
);



--Initialize some data--
INSERT INTO users(username, password, alias, role) values
('admin', 'password', NULL, 'admin'),
('user', 'user', 'GUEST', 'user'),
('testUser', '12345', 'TeStInG', 'user');

INSERT INTO posts(author, datePosted, title, content) values 
((SELECT userid FROM users WHERE username = 'admin'), 20200906, 'Initializing Post', 'Initial Post from the database initialization.');

INSERT INTO subscriptions(subscribee, subscriber, blocked) values
((SELECT userid FROM users WHERE username = 'admin'), (SELECT userid FROM users WHERE username = 'user'), FALSE),
((SELECT userid FROM users WHERE username = 'testUser'), (SELECT userid FROM users WHERE username = 'user'), TRUE);

INSERT INTO comments(postId, author, content) values
(1, (SELECT userid FROM users WHERE username = 'user'), 'FIRST!');

INSERT INTO messages(author, receiver, content) values
((SELECT userid FROM users WHERE username = 'admin'), (SELECT userid FROM users WHERE username = 'user'), 'HELLO USER')
