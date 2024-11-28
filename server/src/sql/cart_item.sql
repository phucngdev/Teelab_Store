create table cart_item
(
    cart_item_id  char(36)                            not null
        primary key,
    cart_id       char(36)                            not null,
    product_id    char(36)                            not null,
    color_size_id char(36)                            not null,
    quantity      int       default 1                 not null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    update_at     timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint fk_cart_item
        foreign key (cart_id) references carts (cart_id)
            on delete cascade,
    constraint fk_color_size_cart_item
        foreign key (color_size_id) references color_size (color_size_id)
            on delete cascade,
    constraint fk_product_cart_id
        foreign key (product_id) references products (product_id)
            on delete cascade
);
