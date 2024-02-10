DROP TABLE IF EXISTS ordered_items CASCADE;
CREATE TABLE ordered_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
 quantity INTEGER

);