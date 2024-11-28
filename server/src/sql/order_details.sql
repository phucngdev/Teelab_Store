create table order_details
(
    order_detail_id char(36)                            not null
        primary key,
    order_id        char(36)                            not null,
    product_id      char(36)                            not null,
    color_size_id   char(36)                            not null,
    quantity        int       default 1                 not null,
    price           decimal(10, 2)                      not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    update_at       timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint fk_color_size_item
        foreign key (color_size_id) references color_size (color_size_id)
            on delete cascade,
    constraint fk_order_item
        foreign key (order_id) references orders (order_id)
            on delete cascade,
    constraint fk_product_item
        foreign key (product_id) references products (product_id)
            on delete cascade
);
