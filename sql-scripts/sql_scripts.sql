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
    `start_date` int(11) not null,
    `end_date` int(11),
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5
;

-- Insert tasks into table
insert into `tasks` 
    (`task`, `user_id`, `start_date`)
values 
    ('First task', 2, 1393362953),
    ('Another task', 2, 1388534400)
;