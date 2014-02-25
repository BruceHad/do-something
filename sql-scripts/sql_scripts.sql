-- Create user table
create table if not exists `users`(
    `id` int(11) not null auto_increment,
    `username` varchar(200) not null,
    primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

-- Insert into user table
insert into `users` (
    `username`) 
values 
    ('BruceHad'),
    ('test'),
;