# List of the routes that we will need to make #
In theory, this should be all of the routes we need. Tbh though we will probably end up needing more

## /auth ##
 - POST /login - Check if the users login is valid then give them a JSON web token that hey can use to access protected routes. This is a post route because you are creating a resource (JSON web token)
 - POST /signup Add a user to the SQL datbabase and give them a JSON web token that they can use to access protected routes


## /tasks ##
- GET / (Base route) - We will have one base get route that will handle the majority of tasks relating to accessing tasks. It should get all the data relating to a task. There will be several query paramters (e.g. ?param1=val&param2=val2) used for customising what is being fetched, such as:
    * limit (integer)
    * offset (integer)
    * orderBy string (due_date, name, completed_at)
    * sortDirection string (asc or desc)
    * taskStatus string (incomplete, pending, complete). Leaving this blank will lead to the selection of all
    * assignedTo array of integrers (The ids of who tasks are assigned to)
- POST / (Base route) - Create a task, this should accept all the data needed to fill int the SQL table
- PUT /:id (Base route) - Edit a tasks deatils (but not the status). this should allow you to modify the details of a task in the SQL table. 'id' refers to the ID of the task you want to modify.
- DELETE /:id  - 'id' refers to the ID of the task you want to modify.
- PUT /:id/status - Change the status of a given task, this should also change give the XP that is appropriate to gain after completing that given task 
- GET /notifcations - This should get any core notifications that are relevant. For example, if there is anything they need to vote on 
- PUT :/id/statusApprovalVote - Vote on whether or not a task should be approved. After voting, it should check the new total number of votes then set the task to completed if it should be completed now.
## /teams ##
- GET /:id (Base Route) Get all the data from the main SQL table relating to the user, along with every member of that team as an array. The data for this is so small (Mostly just integers and maybe some floating point numbers) that it will not be an issue to import all of the data at once. This will be called when the user goes on the main screen and maybe cached on the frontend somehow? Although its not a big deal if we call it a bunch. 'id' refers to the ID of the team you want to access
- POST / (Base route) - Create a team. Y    ou can pass all the data you need, including all of the members of a team
- POST /:id/xp - Alter the XP of your team, there will be a query param 'add' where you enter in the amount of XP you want to add, so this might be like mylike?add=125. Or you may enter a negative value of subtraction. Id is the id of the team you want to modify the XP of

## /user ##
 - PUT /:userId/join/:teamId - Change the id of the team the player is in to a new team. You can pass -1 as the new team if you want to join a current team and not join a new team 

 # Other information about working with routes #


Priority of routes
- Change the team creation route so it creates a random string you can join with
- Add a route to join a team
- Add a route to expel someone from a team
- Add a route to leave a team voluntarily
- Add a route to allow an admin to access the team code
- Add a route to allow an admin to change the team code
- Add a route to change the say you have completed a task (mark as pending)
- Add a route to say you have completed a task
- Add a route to get notificiatons of tasks to vote on