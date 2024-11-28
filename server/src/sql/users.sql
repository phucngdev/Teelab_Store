create table users
(
    user_id    char(36)                                         not null
        primary key,
    username   varchar(255)                                     not null,
    email      varchar(255)                                     not null,
    password   varchar(255)                                     not null,
    role       enum ('user', 'admin') default 'user'            not null,
    status     int                    default 1                 not null,
    avatar     varchar(255)                                     null,
    cart_id    char(36)                                         not null,
    room_id    char(36)                                         not null,
    created_at timestamp              default CURRENT_TIMESTAMP not null,
    update_at  timestamp              default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint cart_id
        unique (cart_id),
    constraint email
        unique (email),
    constraint room_id
        unique (room_id),
    constraint fk_cart
        foreign key (cart_id) references carts (cart_id)
            on delete cascade,
    constraint users_users__fk
        foreign key (room_id) references room_chat (room_id)
            on delete cascade
);
