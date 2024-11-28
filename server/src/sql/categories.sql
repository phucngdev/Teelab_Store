create table categories
(
    category_id    char(36)                            not null
        primary key,
    category_name  varchar(255)                        not null,
    path           varchar(255)                        not null,
    created_at     timestamp default CURRENT_TIMESTAMP not null,
    update_at      timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    category_index int auto_increment,
    constraint category_index
        unique (category_index)
);

INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('3919496f-b04a-421b-872f-263f85be7fb6', 'Baby Tee', 'baby-tee', '2024-09-09 19:02:52', '2024-09-09 19:05:24', 3);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('4992140d-cf04-4c54-8223-3d034aa4f067', 'Áo sơ mi', 'ao-so-mi', '2024-09-09 17:55:08', '2024-09-09 19:05:43', 4);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('6f2e0ccb-1215-4ce8-8094-6e3182486092', 'Quần', 'quan', '2024-09-09 17:55:52', '2024-09-09 19:06:06', 7);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('8244e5ba-8f06-4e42-bf80-91429b64472f', 'Áo thun', 'ao-thun', '2024-09-09 17:54:49', '2024-09-16 20:46:11', 1);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('a1d4aa38-6f88-4d5a-ac70-c88f48cf0efd', 'Hoodie', 'hoodie', '2024-09-09 17:55:33', '2024-09-09 19:05:58', 6);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('d212ef37-9231-4374-9d64-85a787efebe6', 'Quần nữ', 'quan-nu', '2024-09-09 17:55:58', '2024-09-09 19:06:15', 8);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('d8794c70-e628-4041-aac3-7c29fc2a3883', 'Phụ kiện', 'phu-kien', '2024-09-09 17:54:29', '2024-09-09 19:06:15', 9);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('daad91e8-6452-4b96-82d7-b64205f4b6d0', 'Áo polo', 'ao-polo', '2024-09-09 17:54:57', '2024-09-16 20:46:07', 2);
INSERT INTO teelabfull.categories (category_id, category_name, path, created_at, update_at, category_index) VALUES ('ff7f5dbb-89d9-405b-8f82-1e3ab57e959a', 'Áo khoác', 'ao-khoac', '2024-09-09 17:55:20', '2024-09-09 19:05:49', 5);
