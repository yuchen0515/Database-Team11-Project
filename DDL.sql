create table Stuff
(
    stuff_ID   char(8),
    record_date varchar(4),
    status  varchar(1),
    primary key (stuff_ID)
)

create table UserData 
(
    account_ID  char(8),
    password    varchar(15),
    name        varchar(30) not null,
    preference  

    primary key (account_ID)
)

create table Event
(
    event_ID  char(8),
    time varchar(4),
    buf_time    varchar(4),
    title   varchar(50),
    content varchar(500),
    status char(1),
    primary key (event_ID)
)

create table Project
(
    project_ID  char(8),
    deadline    varchar(4),
    importance numeric(2),
    title   varchar(50),
    tag varchar(2),
    intro varchar(200),
    status char(1),
    primary key (project_ID)
)

create table Task
(
    task_ID  char(8),
    project_ID char(8),
    destination varchar(200),
    time_req varchar(4),
    status char(1),
    highlight char(1),
    primary key (task_ID),
    foreign key (project_ID) references Project(project_ID) on delete cascade
) 

create table time_slot
(
    time_slot_id		varchar(4),
    start_year    numeric(4) check (start_year > 1970 and start_year < 2050),
    start_month   numeric(2) check (start_month >= 1 and start_month <= 12),
    start_day			numeric(2) check (start_day >= 1 and start_day <= 31),
    start_hr		numeric(2) check (start_hr >= 0 and start_hr < 24),
    start_min		numeric(2) check (start_min >= 0 and start_min < 60),
    end_year    numeric(4) check (end_year > 1970 and end_year < 2050),
    end_month   numeric(2) check (end_month >= 1 and end_month <= 12),
    end_day			numeric(2) check (end_day >= 1 and end_day <= 31),
    end_hr			numeric(2) check (end_hr >= 0 and end_hr < 24),
    end_min		numeric(2) check (end_min >= 0 and end_min < 60),
    primary key (time_slot_id, start_year, start_month, start_day, start_hr, start_min)
) 
