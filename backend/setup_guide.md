# How to make sure the backend works on your computer #

To run the backend locally, you must:
- Make sure you have mysql installed and setup the database for this project
- Setup your enviromental variables
- Run the server

## Setting up MySQL ##
Install MySQL on you machine then run the setup query on your database. If you have any questionds message Will on discord.

You should then copy and paste the contents of init.sql into the MySQL command line client. This should initialise the database. There may be some sort of bug though.


## Setting up enviromental variables ##
Enviromental variables are basically key value pairs that are not commited to your source code. These are often used when you have sensitive information like API keys you don't want to hardcode into your source code. For this project, just set up your envirometnal variables file as follows

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=[your mysql password]
DB_NAME=projectemon
``` 

>**Note:** Make sure that your database is named projectemon for this to work

This may be expanded later as we add more env variables

## Running the server ##
To run the server all you need to do is run the following command in your terminal:

`node server.js`

This will allow you and the frontend to access the server on http://localhost:5000 (Although you will probably have to suffix it with /api if decide to put that before all of the routes)


>**Note:** Also, when you set up this repository on your computer make sure to run `npm install` to install all of the dependencies we are using