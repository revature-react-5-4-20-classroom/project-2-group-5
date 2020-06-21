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


-- INSERT INTO users values
-- ('coolguy', 'password', 'frosty', 'user'), -- 1
-- ('coolgirl', 'password', 'butterfly', 'user'), -- 2
-- ('coolkid', 'password', 'legokid', 'user'); --3 

-- INSERT INTO posts(author, date_posted, title, content) values 
-- (2, 20200620, 'Sephora', 'Did yall see the new sale going on at sephora this week?  Definitely going!'), -- 1
-- (1, 20200620, 'New here', 'How do I use this app?  Just saw it here.'), -- 2
-- (3, 20200620, 'Minecraft?', 'Just started playing minecraft, how is it?'), -- 3
-- (3, 20200620, 'Computer overheating', 'So I just downloaded that new filter to make everything look cool on Minecraft and now my computer gets really hot, what should I do?'), -- 4
-- (1, 20200620, 'Bagels', 'Found a cool bagel shop on 4th street name "Bagels R Us".  Check it out!'), -- 5
-- (2, 20200620, 'Sold out!', 'Cant believe they already ran out of my favorite brands, some sale!'), -- 6
-- (3, 20200620, 'Birthday coming up', 'Asking mom and dad for a new laptop for my birthday next month!!!!'), -- 7
-- (2, 20200620, 'Just kidding!', 'Oh they said I could order online and still get the sales price - happy camper here.'), -- 8
-- (1, 20200620, 'Hungry', 'Lunch time already and thinking about getting another bagel, should I?'), -- 9

-- INSERT INTO subscriptions(subscribee, subscriber, blocked) values
-- (2, 1, FALSE),
-- (3, 1, FALSE),
-- (1, 2, FALSE),
-- (3, 2, FALSE),
-- (2, 3, FALSE),
-- (1, 3, FALSE);