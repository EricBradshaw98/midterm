DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
 order_placed TIMESTAMP,
  order_ready TIMESTAMP,
  active BOOLEAN

);
