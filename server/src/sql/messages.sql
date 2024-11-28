create table messages
(
    message_id char(36)                            not null
        primary key,
    room_id    char(36)                            not null,
    sender_id  char(36)                            not null,
    content    text                                not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    read_at    timestamp                           null,
    deleted_at timestamp                           null,
    constraint fk_room
        foreign key (room_id) references room_chat (room_id)
);

