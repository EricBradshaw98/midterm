const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    });
};

const getAllFoodItems = () => {
  const queryString = `
  SELECT id, name, description, price
  FROM menu;`;
  return db.query(queryString)
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

//getAllMenuItems other query
//getorders other query
//getsubtotal other query
const getSubtotal = (orderID) => {
  const queryString = `
  SELECT SUM(price * ordered_items.quantity)/100 as subtotal
  FROM menu
  JOIN ordered_items on (menu.id = ordered_items.menu_item_id)
  JOIN orders on (ordered_items.order_id = orders.id)
  WHERE orders.id = $1
  GROUP BY orders.id, price, ordered_items.quantity;`
}

//clear cart
const cancelCartOrder = (orderID) => {
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

//order history all check
const getOrders = (orderID) => {
  const queryString = `
  SELECT menu.name, menu.price as price, photo_url, description, ordered_items.quantity, ordered_items.id as ordered_itemsID, orders.order_placed
  FROM menu
  JOIN ordered_items on (menu.id = ordered_items.menu_item_id)
  JOIN orders on (ordered_items.order_id = orders.id)
  WHERE orders.id = $1;
  `;
  return db.query(queryString, [orderID])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}



//CHeckout order
const submitOrder = (orderID) => {
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
const removeFoodItem = (menuItemName, orderID) => {
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

const getOwnerPhone = () => {
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
const getCart = (userID) => {
  const queryOrder = `
  SELECT *
  FROM orders
  WHERE user_id = $1 AND order_placed IS NULL`;
  const queryNewOrder = `
  INSERT INTO orders (user_id) VALUES ($1)
  RETURNING *
  `;
  return db.query(queryOrder, [userID])
  .then((data) => {
    if (!data.row[0]) {
      return db.query(queryNewOrder);
    }
    //if order exists
    return data;
  });


}

//specific menu item from specfic ordereditem cart

const searchCart = (orderID, menuItemID) => {
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

//add to ordered items specific menu item, quantity and order

const addToCart = (orderID, menuItemID, quantity) => {
  const addToCart = `
  INSERT INTO ordered_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)
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
const getOrdersAdmin = () => {
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

const updateOrdersQuery = (orderID) => {
  const queryString = `UPDATE orders SET active = 'false' WHERE id = $1`

  return db.query(queryString,[orderID])
  .then((data) => {
    return data.rows;
  })
}

const getUserPhone = (orderID) => {
  const userquery = `SELECT customers.phone FROM customer JOIN orders ON orders.customer_id = customers.id WHERE orders.id = $1`;

  return db.query(queryString,[orderID])
  .then((data) => {
    return data.rows;
  })
}

const orderItemContentsQuery = (orderID) => {
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

const queryCurrentOrder = (userID) => {
  const queryCurrent = `SELECT *
  FROM orders
  WHERE user_id = $1 AND order_placed IS NOT NULL AND order_ready IS NULL
  `;
  return db.query(queryCurrent, [userID])
  .then((data) => {
    return data.rows;
  })
}


const createNewOrderQuery = (userID) => {
  const queryCreate = `INSERT INTO orders (user_id) VALUES ($1)
  RETURNING *;
  `;
  return db.query(queryCreate, [userID])
  .then((data) => {
    return data.rows;
  })
}

const queryAllFoodItems = () => {
  const querymenu = `SELECT id, name, description, price, photo_url
  FROM menu;
  `;
  return db.query(querymenu)
};

module.exports = { 
  queryAllFoodItems, 
  createNewOrderQuery, 
  queryCurrentOrder, 
  orderItemContentsQuery, 
  getUserPhone, 
  updateOrdersQuery, 
  getOrdersAdmin, 
  queryAllOrders, 
  updateCart, 
  addToCart, 
  searchCart, 
  getCart, 
  getOwnerPhone, 
  getSubtotal, 
  updateQuantity, 
  removeFoodItem, 
  submitOrder, 
  cancelCartOrder, 
  getOrders, 
  getAllFoodItems, 
  getUsers 
};
//need get order history
