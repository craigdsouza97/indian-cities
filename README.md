# indian-cities
View a list of cities from various states in India using a React.js UI and a Node.js back-end.


Requirements to use this repository:

1) MongoDB needs to be installed.

2) Node.js needs to be installed with version 14.16.0



Steps to install and use this repository:

You just need to run startup_script.bat to install dependencies, setup MongoDB and start the server. 



Incase the script does not work please run the following commands:

cd ./indian-cities-backend/ 
npm install 
npm run start 

cd ../indian-cities-ui 
npm install 
npm run start 

cd .. 
mkdir MongoDB\bin\data\db 
mongod --dbpath MongoDB\bin\data\ 
mongo 127.0.0.1/indian-cities insert-cities.js



.env in indian-cities-backend is the configuration file that will be used for the backend and it contains the key for the jwt token as well as the pagination limit.

Ideally .env should not be commited to the repository but since this is an assignment I have commited it to the repository.

I have set the JWT Token to expire in an hour so that we can test whether the UI will redirect to Login if the token has expired.



API Documentation:


/api/v1/indiancities/users - POST - Creates a new User and returns a token which is valid for 1 Hour
/api/v1/indiancities/users/login - POST - Authenticates a User and returns a token which is valid for 1 Hour
/api/v1/indiancities/cities - GET - Returns a Paginated list of the cities.