const db = require('../connection');

const getAllOrderedItems = function (limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT *
    FROM ordered_items
    LIMIT $1
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllOrderedItems
};
