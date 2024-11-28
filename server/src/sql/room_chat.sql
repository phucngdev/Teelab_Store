create table room_chat
(
    room_id    char(36)                            not null
        primary key,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    update_at  timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);
