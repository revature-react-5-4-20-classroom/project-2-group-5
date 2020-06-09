##GROUP 5 PROJECT 2

Mark Alsip
Steven Gutierrez
Kruti Fadadu
Janak Acharya


##UNTITLED PROJECT

#summary - 
	This app will be designed to allow users to post messages on an online board.  Each user has their own board, as
	well as a board to view other users they are "subscribed" to.  At a high level, it will be a social media app.

#user stories - 
	- users can be created and deleted
	- every user has a profile page
	- a user can make posts
	- a profile page shows user information, and their posts
	- users can view each others profile pages
	- a user can leave a comment on another user's post or their own post
	- users can subscribe to one another
	- users can view who they are subscribed to, and who is subscribed to them
	- every user has a homepage
	- a homepage shows the posts of all users they are subscribed to
	- a user can change their information
	- a user can block another user from subscribing and commenting to their posts
	- a user can search through posts 
	- users can send messages to one another
	- users can upload avatar photos (optional)
	- users can post photos (optional)
	- users posts can be parsed into an emotion through language processing (optional)
	- admin can ugrade users to moderators (optional)
	- admin and moderators can delete user posts and users (optional)

#relational database - 
	users
		- userid
		- username
		- password
		- alias
		- role

	posts
		- postid 
		- author
		- dateposted
		- title
		- text

	subscription
		- subscription id
		- subscribee
		- subscriber

	blocked
		-blocker id
		-blockee
		-blocker

	comment
		- postid
		- commentid
		- author
		- text

	messages
		-messageid
		-author
		-reciever
		
frontend decisions
	- reactstrap for styling
	- flow
		- site homepage (all new posts) (or if already logged in redirect to user homepage)
		- view specific users page
		- login/create user
		- user homepage (branching point)
		- user profile page/ view other user pages
		- create post, view other users, view subscribers/subscribed users, back to homepage
	
