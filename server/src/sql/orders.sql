create table orders
(
    order_id       char(36)                                             not null
        primary key,
    user_id        char(36)                                             not null,
    total          decimal(10, 2)                                       not null,
    transaction    enum ('normal', 'zalopay') default 'normal'          not null,
    payment_status enum ('0', '1')            default '0'               not null,
    status         enum ('0', '1', '2', '3', '4')  default '0'          not null,
    created_at     timestamp                  default CURRENT_TIMESTAMP not null,
    update_at      timestamp                  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    address        varchar(255)                                         not null,
    city           varchar(255)                                         not null,
    district       varchar(255)                                         not null,
    ward           varchar(255)                                         not null,
    phone          varchar(20)                                          not null,
    email          varchar(255)                                         not null,
    note           varchar(255)                                         null,
    username       varchar(255)                                         not null,
    constraint fk_user
        foreign key (user_id) references users (user_id)
            on delete cascade
);
