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

    record_date_start_date DATE,
    record_date_start_time TIME,
    record_date_end_date DATE,
    record_date_end_time TIME,

    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (stuff_ID),
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;


create table Event
(
    event_ID        char(8),
    account_ID      char(8),

    time_start_date DATE,
    time_start_time TIME,
    time_end_date   DATE,
    time_end_time   TIME,

    buf_time        TIME,
    title           varchar(50),
    content         varchar(500),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (event_ID),
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;

create table Project
(
    project_ID      char(8),
    account_ID      char(8),

    deadline_start_date DATE,
    deadline_start_time TIME,
    deadline_end_date DATE,
    deadline_end_time TIME,
    importance      numeric(2), /* priority by number */
    title           varchar(50),
    tag             varchar(2),
    intro           varchar(200),
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (project_ID),
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;

create table Task
(
    task_ID         char(8),
    project_ID      char(8),
    destination     varchar(200),

    time_req_start_date DATE,
    time_req_start_time TIME,
    time_req_end_date DATE,
    time_req_end_time TIME,

    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    highlight       char(1),
    primary key (task_ID),
    foreign key (project_ID) references Project(project_ID) on delete cascade
)  ENGINE=INNODB;
