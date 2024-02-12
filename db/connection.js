// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;



const getAllMenuItems = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT menu.*
    FROM menu
  `;

  queryParams.push(limit);

  return db.query(queryString, queryParams).then((res) => res.rows);
};


module.exports = {
  getAllMenuItems
};
