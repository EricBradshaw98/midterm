const db = require('../connection');

const getAllMenuItems = function (limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT *
    FROM menu
    LIMIT $1
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllMenuItems
};
const db = require('../connection');

const getAllMenuItems = function (limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT *
    FROM menu
    LIMIT $1
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllMenuItems
};
