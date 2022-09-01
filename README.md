# Social-Profile-App
A fully MERN stack web application look like a social media for IT professionals.

There are three section about the project.
1. client side setup.
2. serevr side setup.
3. Deployment on heroku.

....................................................................................................................................

client Setup
-----------------------------
  1. npx create-react-app client.
  2. configure bootstrap , fontawesome icons.
	3. npm install mdbootstrap @fortawesome/fontawesome-free.
	4. index.js file with all css files
	5. index.html fontawesome css file
	6. add google fonts "Ubuntu" font in index.html


-> install axios , react-router-dom
	-> npm install axios react-router-dom

-> configure redux
	-> install the redux related packages
	-> npm install redux react-redux redux-thunk redux-logger redux-devtools-extension
	-> configure store & root Reducer
	-> Provide the "store" to React Application

-> application folder structure
	-> layout
		-> home
		-> navbar
		-> util
			-> spinner
			-> alert
	-> modules
		-> users
			-> user-register
			-> user-login
		-> posts
			-> post-list
			-> post-details
		-> developers
			-> developer-list
			-> developer-details
		-> profiles
			-> dashboard
			-> edit-profile
			-> add-experience
			-> add-education
			-> create-profile
                        
