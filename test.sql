/*
given: account_ID ==> AID
get: User Data
*/

select * from UserData where account_ID = AID
delete from UserData where account_ID = AID
insert into UserData values (account_ID, password, name, preference)



/*
given: Account_ID ==> AID
get: All the ____ for a Account_ID
*/

create view getStuffbyAID AS
    select * from Stuff where account_ID = AID and AID in (select account_ID from UserData)
/*
select ___ from getStuffbyAID where ... = ...;
*/




create view getEventbyAID AS
    select * from Event where account_ID = AID and AID in (select account_ID from UserData)
/*
select ___ from getEventbyAID where ... = ...;
*/



create view getProjectbyAID AS
    select * from Project where account_ID = AID and AID in (select account_ID from UserData)
/*
select ___ from getProjectbyAID where ... = ...;
*/



create view getTaskbyPID AS
    select * from Task where project_ID = PID and PID in (select project_ID from Project)
/*
select ___ from getTaskbyPID where ... = ...;
*/



/*
list all task for some User
*/
select * from Task where project_ID in (select project_ID from getProjectbyAID)



/*
get the owner of a task
*/
select account_ID from Project where project_ID in (select project_ID from Task)
