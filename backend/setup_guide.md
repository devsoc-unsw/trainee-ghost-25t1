# How to make sure the backend works on your computer #

To run the backend locally, you must:
- Make sure you have mysql installed and setup the database for this project
- Setup your enviromental variables
- Run the server

## Setting up MySQL ##
- Still worfking on this, i may make is so i will just host it


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

This may be expanded later as we add more variables