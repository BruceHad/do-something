----------------------------------
-- End Setup
----------------------------------
-- Create user table
create table if not exists `users`(
    `id` int(11) not null auto_increment,
    `username` varchar(200) not null,
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

-- Insert into user table
insert into `users` (
    `id`, `username`) 
values 
    (1,'BruceHad'),
    (2,'test')
;

-- Create tasks table
create table if not exists `tasks`(
    `id` int(11) not null auto_increment,
    `task` varchar(200) not null,
    `user_id` int(11) not null,
    `start_date` date not null,
    `end_date` date,
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5
;

-- Insert tasks into table
insert into `tasks` 
    (`id`, `task`, `user_id`, `start_date`)
values 
    (1, 'First task',   2, 1393362953),
    (2, 'Another task', 2, 1388534400)
;

-- Creates tasks_done table
create table if not exists `tasks_done`(
    `id` int(11) not null auto_increment,
    `task_id` int(11) not null,
    `date_complete` date not null,
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5
;

insert into `tasks_done` 
    (`id`, `task_id`, `date_complete`)
values 
    (1, 1, str_to_date('01-JAN-2014','%d-%M-%Y')),
    (2, 2, str_to_date('01-FEB-2014','%d-%M-%Y'))
;

----------------------------------
-- End Setup
----------------------------------
select id, task, user_id from tasks where user_id = $id;
