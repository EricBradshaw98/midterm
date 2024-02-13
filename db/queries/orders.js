const db = require('../connection');

const getAllOrderItems = function (limit = 20) {
  const queryParams = [];
  let queryString = `
    SELECT *
    FROM orders
    JOIN ordered_items ON orders.id = ordered_items.order_id
    
    LIMIT $1;
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllOrderItems
};
