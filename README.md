# Node project
**Database creation**  
For creating the database you will need to run the [userkeszites](userkeszites.sql) file.  


**Creating new users in the database**  
To sign in:  
run the [adminkeszites](adminkeszites.sql) file, this will create two users in the database,  
one being admin and the other one user.  


| user   | password |  
| ------ | -------- |  
| admin  | admin    |  
| user   | user     | 



**Dummy data**  
You can load some dummy data in the database by running the [hirdeteskeszites](hirdeteskeszites.sql) file.  



**Sign up**  
On the signup endpoint you can create new users, these users **won't** have admin roles.  



**Roles**
The admin can access all endpoints, the simple user may access only the search endpoint.
The login and signup endpoint can be seen by anybody.  


| user   | permissions    |  
| ------ | -------------- |  
| admin  | all            |  
| user   | /search        |  
| guest  | /login, /signup|


