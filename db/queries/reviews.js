const db = require('../connection');

const getAllReviewItems = function (limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT * 
  FROM reviews JOIN customers ON customers.id = customer_id
  LIMIT $1
  `;

  queryParams.push(limit);
  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllReviewItems
}