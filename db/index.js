/* 
--------------------
Backend for Nutrify:
--------------------
APIS:
-----
1. SignUp Api ->
    Collect 
            - email (unique in db), 
            - passowrd and
            - max calories per day limit
    and create user in database
2. SignIn Api ->
    Validate user provided email and password with db values and return a jwt token on successful authentication
3. Create meal Api ->
    Collect date, meal name, calories and create meal in the database (each meal must have a unique meal-ID
4. Update meal Api ->
    Collect updated name and calories and send update the values in db
5. Delete meal Api ->
    Delete meal from database using meal-ID 
6. Read Meals Api ->
    Pass the date as a param and return all the meals created on that date.
    Also, add an aggregate value of calories on that day
NOTE: All the apis from 3 - 6 needs to verify JWT before executing
*/

const dbClient = require('monk')('localhost/usermealdb')

module.exports = dbClient;