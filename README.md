# Social-Profile-App
> It is a completely MERN stack web application.If someone wish to use it, first he/she has to be login and then he can maintain his/her
professional profile. He/She can make a post, comment on others post and much more.
There are many reliable and advanced technoloies like **React , Redux, node js, express js, mongoDb** and many more
are used to develop and maintain the project.



## 🛠 Technologies used
> ### client side setup

- configure bootstrap , fontawesome icons

	```
  npm install mdbootstrap @fortawesome/fontawesome-free
  ```
	 - import  all css and fontawesome files in `index.js`
	
	- Add google fonts "Ubuntu" font in `index.html`

  - Install axios , react-router-dom
  ```
  npm install axios react-router-dom
  ```



- configure Redux setup
	  > install the redux related packages
	```
  npm install redux react-redux redux-thunk redux-logger redux-devtools-extension
  ```
	- configure store & root Reducer
	- Provide the "store" to React Application




> ### Server side setup

- server side configuration made using these technologies like node js, express js, mongoDB.
  > for simple and easy way of creating server, you should use express js.
  
  > mongoDB is, document-oriented database program, used for perform database operation in simplest way. 

- There are numbers of npm modules have been used in server side.

   > bcryptjs, cors, dotenv, express, express-validator, gravatar, jsonwebtoken, mongoose
    - **bcryptjs** used for password encryption/dicription.
    - **CORS** stands for Cross-Origin Resource Sharing user for perform cross browser operation.This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API.
    - dotenv used for smartly manage our environmental variables.
    - express used for simple way of server creation.
    - express-validator used  for making server side form validation.
    - gravatar gives us avatar url associated with the email of the user logged in.
    - jsonwebtoken, JSON Web Token, is an open standard used to share security information between two parties — a client and a server
    - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
![mongoose-pic](./img/carbon.s);

    > You can install all the node modules in a single shot.
    ```
    npm install bcryptjs cors dotenv express express-validator gravatar jsonwebtoken mongoose
## How to clone and Run the Project

### clone the project

- you can clone the project to your local machine using the command.

```
git clone --branch <branch_name> <git_respos_http_link>
```
> After the successfully cloned, You would not get node-modules folder,  so for get the node-modules folders in the both client and server you have to hit the command in the both terminals.This will  install all the npm dependencies listed inside the package.json file of both.
```
npm install 
```
Note :  please update the MONGO_DB_CLOUD_URL with yours.

### Run the project
> you need two terminals to run client and server seperatly.
- for client
```
npm run client 
```

- for server
```
npm run server 
```

## 🚀 Deployment on heroku

![server-page](./img/server.png);

![deployment-info](./img/deployment.png);
