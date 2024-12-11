INSERT INTO user (username, email, password, type, promotionalEmails) VALUES
('john_doe', 'john.doe@example.com', '$2b$10$ZjPowUKS3yWvYPDw534ynek3rCCUnXVxJKzHaCXxRW81KSoKLKL6a', 'customer', TRUE),
('jane_smith', 'jane.smith@example.com', '$2b$10$6kcluecS6xlCOgLl2.4TDOOaguE/exIf8mWHoCA7fxte/NlJZoB/y', 'customer', FALSE),
('admin', 'admin@example.com', '$2b$10$6kcluecS6xlCOgLl2.4TDOOaguE/exIf8mWHoCA7fxte/NlJZoB/y', 'admin', TRUE),
('alice_walker', 'alice.walker@example.com', '$2b$10$nbbnjxxrW4rJpLqNln..h.XNKnpqUq3kKP0vFVkCl4ds0JkOO/xBG', 'customer', FALSE),
('bob', 'bob.brown@example.com', '$2b$10$0XQffCLAAYVrAwKzjBplA.e4.O4qKGGpdDTstWgf.smoO9W7aNSIi', 'customer', TRUE);

INSERT INTO product (sku, name, description, img, price, discount) VALUES
(1001, 'Small Unicorn Plush', 'A small, cuddly unicorn plush toy, perfect for kids.', 'small_unicorn_plush.jpg', 19.99, 2.00),
(1002, 'Medium Unicorn Plush', 'A medium-sized, soft unicorn plush with rainbow mane.', 'medium_unicorn_plush.jpg', 39.99, 5.00),
(1003, 'Large Unicorn Plush', 'A large unicorn plush with glittery horn and soft, plush body.', 'large_unicorn_plush.jpg', 59.99, 10.00),
(1004, 'Giant Unicorn Plush', 'A giant, huggable unicorn plush that makes a perfect gift.', 'giant_unicorn_plush.jpg', 99.99, 15.00),
(1005, 'Deluxe Unicorn Plush', 'An ultra-soft deluxe unicorn plush with embroidered details.', 'deluxe_unicorn_plush.jpg', 79.99, NULL);

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
