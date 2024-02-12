const db = require('../connection');

const getAllOrderItems = function (limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT *
    FROM orders
    LIMIT $1
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllOrderItems
};
