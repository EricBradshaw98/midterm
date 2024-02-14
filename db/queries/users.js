const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    });
};

//getAllMenuItems other query
//getorders other query
//getsubtotal other query

//clear cart
const clearCart = (orderID) => {
  const queryString = `
  DELETE FROM orders
  WHERE id = $1
  AND placed_aty IS NULL
  RETURNING *;
  `;
  return db.query(queryString, [orderID])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

//order history


//CHeckout order
const checkoutOrder = (orderID) => {
  const queryString =`
  UPDATE orders
  SET order_placed = CURRENT_TIMESTAMP AT TIME ZONE 'ET', active = true
  WHERE id = $1
  AND order_placed IS NULL
  RETURNING *;
  `;

return db.query(queryString, [orderID])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })

}

//remove a menu item
const deleteMenuItem = (menuItemName, orderID) => {
  const queryString =`
  DELETE FROM ordered_items
  USING menu, orders
  WHERE (ordered_items.menu_item_id = menu.id)
  AND (ordered_items.order_id = orders.id)
  AND menu.name = $1
  AND orders.id = $2
  RETURNING *;`

  return db.query(queryString, [menuItemName, orderID])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
}





module.exports = { getUsers };
