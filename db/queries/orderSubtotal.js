const db = require('../connection');

const orderSubtotal = function (orderId) {
  const queryString = `
  SELECT SUM(price * ordered_items.quantity)/100 AS subtotal
  FROM menu_items
  JOIN ordered_items on (menu_items.id = ordered_items.menu_item_id)
  JOIN orders on (ordered_items.order_id = orders.id)
  WHERE orders.id = $1
  GROUP BY orders.id, price, ordered_items.quantity;
  `;
  return db.query(queryString, [orderId])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


module.exports = {orderSubtotal}

