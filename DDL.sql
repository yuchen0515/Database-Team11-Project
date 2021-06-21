create table UserData 
(
    account_ID      char(20),
    password        varchar(32),
    name            varchar(30) not null,
    preference      varchar(500), /* JSON format */
    primary key (account_ID)
) ENGINE=INNODB;

create table Stuff
(
    stuff_ID        int(20) NOT NULL AUTO_INCREMENT,
    account_ID      char(20),

    record_date_date DATE,
    record_date_time TIME,

    title           varchar(50),
    content         varchar(500),

    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (stuff_ID),
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;


create table Event
(
    event_ID        int(20) NOT NULL AUTO_INCREMENT,
    account_ID      char(20),

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
    project_ID      int(20) NOT NULL AUTO_INCREMENT,
    account_ID      char(20),

    deadline_date DATE,
    deadline_time TIME,
    importance      numeric(2), /* priority by number */
    title           varchar(50),
    tag             varchar(50),
    intro           varchar(200),
    highlight       int(20) DEFAULT 0,
    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (project_ID),
    foreign key (account_ID) references UserData(account_ID) on delete cascade
) ENGINE=INNODB;

create table Task
(
    task_ID         int(20) NOT NULL AUTO_INCREMENT,
    project_ID      int(20),
    destination     varchar(200),

    time_req_date DATE,
    time_req_time TIME,

    status          varchar(1)
        check (status in ('Y', 'N', 'A')), 
        /* Y: Done, N: Not yet, A: Abandon */
    primary key (task_ID),
    foreign key (project_ID) references Project(project_ID) on delete cascade
)  ENGINE=INNODB;
