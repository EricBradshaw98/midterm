INSERT INTO orders (customer_id, order_placed, order_ready, active)
VALUES (1, NOW(), DATE_ADD(NOW(), INTERVAL 40 MINUTE), true);

INSERT INTO orders (customer_id, order_placed, order_ready, active)
VALUES (2, NOW(), DATE_ADD(NOW(), INTERVAL 60 MINUTE), true);

INSERT INTO orders (customer_id, order_placed, order_ready, active)
VALUES (2, NOW(), DATE_ADD(NOW(), INTERVAL 60 MINUTE), true);
