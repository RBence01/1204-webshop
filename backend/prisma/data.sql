INSERT INTO user (username, email, password, type, promotionalEmails) VALUES
('john_doe', 'john.doe@example.com', '$2b$10$ZjPowUKS3yWvYPDw534ynek3rCCUnXVxJKzHaCXxRW81KSoKLKL6a', 'customer', TRUE),
('jane_smith', 'jane.smith@example.com', '$2b$10$6kcluecS6xlCOgLl2.4TDOOaguE/exIf8mWHoCA7fxte/NlJZoB/y', 'customer', FALSE),
('admin', 'admin@example.com', '$2b$10$6kcluecS6xlCOgLl2.4TDOOaguE/exIf8mWHoCA7fxte/NlJZoB/y', 'admin', TRUE),
('alice_walker', 'alice.walker@example.com', '$2b$10$nbbnjxxrW4rJpLqNln..h.XNKnpqUq3kKP0vFVkCl4ds0JkOO/xBG', 'customer', FALSE),
('bob', 'bob.brown@example.com', '$2b$10$0XQffCLAAYVrAwKzjBplA.e4.O4qKGGpdDTstWgf.smoO9W7aNSIi', 'customer', TRUE);

INSERT INTO product (sku, name, description, img, price, discount) VALUES
(1001, 'Small Unicorn Plush', 'A small, cuddly unicorn plush toy, perfect for kids.', 'https://img.joomcdn.net/4e42ae0ad0c6474f9f964d30db9b67b4b196aa69_original.jpeg', 19.99, 2.00),
(1002, 'Medium Unicorn Plush', 'A medium-sized, soft unicorn plush with rainbow mane.', 'https://i5.walmartimages.com/seo/TY-Beanie-Boos-MAGIC-the-Pink-Unicorn-Glitter-Eyes-Medium-Size-9-inch_9d7f21d2-5789-40a6-9693-57b3505427b6.e327970f27279582936ca471ffa955a1.jpeg', 39.99, 5.00),
(1003, 'Large Unicorn Plush', 'A large unicorn plush with glittery horn and soft, plush body.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXU7VNkZjltWojZGbwL1_YYDOfz7E6c0fFog&s', 59.99, 10.00),
(1004, 'Giant Unicorn Plush', 'A giant, huggable unicorn plush that makes a perfect gift.', 'https://www.mangopeopleshop.com/cdn/shop/files/giant-unicorn-plush-toy-850_1200x1200.jpg?v=1708755496', 99.99, 15.00),
(1005, 'Deluxe Unicorn Plush', 'An ultra-soft deluxe unicorn plush with embroidered details.', 'https://discowaffle.com/cdn/shop/products/Honeythunder-15-fullfront_497x1_0385986d-9f88-4cc1-94f6-9ffccbcd5047.jpg?v=1641304936&width=297', 79.99, NULL);

INSERT INTO purchase (userId) VALUES
(1), (2), (4), (5), (1);

INSERT INTO _producttopurchase (A, B) VALUES
(1001, 1),
(1001, 2),
(1001, 5),
(1002, 3),
(1002, 4),
(1003, 2),
(1003, 5),
(1004, 1),
(1004, 3),
(1005, 2);