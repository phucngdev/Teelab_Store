create table sizes
(
    size_id     char(36)                                  not null
        primary key,
    size_name   varchar(255)                              not null,
    quantity    int                default 0              not null,
    status      enum ('0', '1')    default '1'            not null
);
