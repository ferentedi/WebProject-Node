# Node project
**Database creation**  
For creating the database you will need to run the [createdatabase](createdatabase.sql) file.


**Creating new users in the database**  
run the [createadmin](createadmin.sql) file, this will create two users in the database,  
one being admin and the other one user.  


| user   | password |  
| ------ | -------- |  
| admin  | admin    |  
| user   | user     | 



**Dummy data**  
You can load some dummy data in the database by running the [dummydata](dummydata.sql) file.  


**Sign up**  
On the signup endpoint you can create new users, these users **won't** have admin roles.  


**Roles**   
Only the admin can access all endpoints.
The login and signup endpoints can be seen by anybody. 

# Starting the application
**Start the project**   
To start the project type npm start in the command line.
