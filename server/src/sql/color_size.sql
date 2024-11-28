create table color_size
(
    color_size_id char(36) not null
        primary key,
    product_id    char(36) not null,
    color_id      char(36) not null,
    size_id       char(36) not null,
    constraint fk_color
        foreign key (color_id) references colors (color_id)
            on delete cascade,
    constraint fk_product
        foreign key (product_id) references products (product_id)
            on delete cascade,
    constraint fk_size
        foreign key (size_id) references sizes (size_id)
            on delete cascade
);
