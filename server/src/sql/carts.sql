create table carts
(
    cart_id    char(36)                            not null
        primary key,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    update_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);
