create table UserData 
(
    account_ID      char(8),
    password        varchar(15),
    name            varchar(30) not null,
    preference      varchar(500), /* JSON format */
    primary key (account_ID)
) ENGINE=INNODB;

create table Stuff
(
    stuff_ID        char(8),
    account_ID      char(8),
    record_date     varchar(4),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (stuff_ID),
    foreign key (record_date) references time_slot(time_slot_id) on delete set null,
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;


create table Event
(
    event_ID        char(8),
    account_ID      char(8),
    time            varchar(4),
    buf_time        varchar(50), /* JSON format: hr, min, sec */
    title           varchar(50),
    content         varchar(500),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (event_ID),
    foreign key (time) references time_slot(time_slot_id) on delete set null,
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;

create table Project
(
    project_ID      char(8),
    account_ID      char(8),
    deadline        varchar(4),
    importance      numeric(2), /* priority by number */
    title           varchar(50),
    tag             varchar(2),
    intro           varchar(200),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (project_ID),
    foreign key (deadline) references time_slot(time_slot_id) on delete set null,
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;

create table Task
(
    task_ID         char(8),
    project_ID      char(8),
    destination     varchar(200),
    time_req        varchar(4),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    highlight       char(1),
    primary key (task_ID),
    foreign key (project_ID) references Project(project_ID) on delete cascade,
    foreign key (time_req) references time_slot(time_slot_id) on delete set null
)  ENGINE=INNODB;

create table time_slot
(
    time_slot_id    varchar(4),
    start_year      numeric(4) check (start_year > 1970 and start_year < 2050),
    start_month     numeric(2) check (start_month >= 1 and start_month <= 12),
    start_day	    numeric(2) check (start_day >= 1 and start_day <= 31),
    start_hr		numeric(2) check (start_hr >= 0 and start_hr < 24),
    start_min		numeric(2) check (start_min >= 0 and start_min < 60),
    end_year        numeric(4) check (end_year > 1970 and end_year < 2050),
    end_month       numeric(2) check (end_month >= 1 and end_month <= 12),
    end_day			numeric(2) check (end_day >= 1 and end_day <= 31),
    end_hr			numeric(2) check (end_hr >= 0 and end_hr < 24),
    end_min		    numeric(2) check (end_min >= 0 and end_min < 60),
    primary key (time_slot_id, start_year, start_month, start_day, start_hr, start_min)
)  ENGINE=INNODB;
