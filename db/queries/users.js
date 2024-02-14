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

//update ordered_items
const updateQuantity = (newQuantity, orderContentID) => {
  const queryString =`
  UPDATE ordered_items
  SET quantity = $1
  WHERE id = $2
  RETURNING *`

  return db.query(queryString, [newQuantity, orderContentID])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
}

//find users phone

const getPhoneNum = () => {
  const queryString = `
  SELECT phone
  FROM customers
  WHERE id = 1;
  `
  return db.query(queryString)
  .then((data) => {
    return data.rows[0].phone;
  })
  .catch((err) => {
    console.log(err.message);
  })

};

//get the ordered items in cart
const cart = (userID) => {
  const queryOrder = `
  SELECT *
  FROM orders
  WHERE user_id = $1 AND order_placed IS NULL`
  const queryNewOrder = `
  INSERT INTO orders (user_id) VALUES ($1)
  RETURNING *
  `
  return db.query(queryOrder, [userID])
  .then((data) => {
    if (!data.row[0]) {
      return db.query(queryNewOrder);
    }
    //if order exists
    return data;
  });


}

const cartSearch = (orderID, menuItemID) => {
  const cartQuery= `
  SELECT *
  FROM ordered_items
  WHERE orders_id = $1 AND menu_item_id = $2
  `

  return db.query(cartQuery, [orderID, menuItemID])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })

};

const addCart = (orderID, menuItemID, quantity) => {
  const addToCart = `
  INSERT INTO ordered_items (orders_id, menu_item_id, quantity) VALUES ($1, $2, $3)
  `;
  return db.query(addToCart, [orderID, menuItemID, quantity || 1])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

//update cart
const updateCart = (quantity, orderID, menuItemID) => {
  const queryCartUpdate = `
  UPDATE ordered_items
  SET quantity = quantity + $1
  WHERE order_id = $2
  AND menu_item_id = $3`
  ;
  return db.query(queryCartUpdate, [quantity || 1, orderID, menuItemID]).catch

  ((err) => {
    console.log(err.message);
  })
}

const queryAllOrders = (userID) => {
  const queryString = `SELECT
  orders.id, orders.order_placed, orders.active, orders.order_ready,
  SUM(ordered_items.quantity * menu_items.price) AS total_price
  FROM orders
  JOIN ordered_items ON orders.id = ordered_items.order_id
  JOIN menu ON menu_items.id = ordered_items.menu_item_id
  WHERE orders.user_id = $1 AND orders.order_placed IS NOT NULL
  GROUP BY orders.id
  ORDER BY orders.order_placed;`;

  return db.query(queryString, [userID])
  .then((data) => {
    return data.rows;
  })
}
//query to get the admin orders
const adminOrders = () => {
  const queryString = `
  SELECT
  orders.id, orders.order_placed, orders.active, orders.order_ready,
  SUM(ordered_items.quantity * menu_items.price) AS total_price
  FROM orders
  JOIN ordered_items ON orders.id = ordered_items.order_id
  JOIN menu ON menu_items.id = ordered_items.menu_item_id
  WHERE orders.active = 'true'
  GROUP BY orders.id
  ORDER BY orders.active, orders.order_placed;
  `

  return db.query(queryString)
  .then((data) => {
    return data.rows;
  })
}

const updateOrderQuery = (orderID) => {
  const queryString = `UPDATE orders SET active = 'false' WHERE id = $1`

  return db.query(queryString,[orderID])
  .then((data) => {
    return data.rows;
  })
}

const userPhone = (orderID) => {
  const userquery = `SELECT customers.phone FROM customer JOIN orders ON orders.customer_id = customers.id WHERE orders.id = $1`;

  return db.query(queryString,[orderID])
  .then((data) => {
    return data.rows;
  })
}

const orderContentsQuery = (orderID) => {
  const itemQuery = `SELECT
  menu.name, ordered_items.quantity, menu.price AS price
  FROM ordered_items
  JOIN menu ON menu.id = ordered_items.menu_item_id
  WHERE ordered_items.order_id = $1;`;

  return db.query(itemQuery, [orderID])
  .then((data) => {
    return data.rows;
  })
}
//need to check this one

const currentOrder = (userID) => {
  const queryCurrent = `SELECT *
  FROM orders
  WHERE user_id = $1 AND order_placed IS NOT NULL AND order_ready IS NULL`;

  return db.query(queryCurrent, [userID])
  .then((data) => {
    return data.rows;
  })
}





module.exports = { getUsers };
