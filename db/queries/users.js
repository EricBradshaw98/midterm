const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM customers;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
