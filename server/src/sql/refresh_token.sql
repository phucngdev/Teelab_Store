create table refresh_token
(
    refresh_token_id char(36)     not null
        primary key,
    token            varchar(255) not null,
    constraint token
        unique (token)
);
