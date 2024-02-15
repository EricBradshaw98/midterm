const db = require('../connection');

const getAllReviewItems = function () {
  const queryString = `
    SELECT * 
    FROM reviews 
    JOIN users ON users.id = user_id
  `;
  
  return db.query(queryString)
    .then((res) => res.rows)
}

module.exports = {
  getAllReviewItems
}
