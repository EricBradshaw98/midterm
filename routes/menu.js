const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users')

router.get("/", (req, res) => {

  const userID = req.cookies.user_id || 1;

  userQueries.queryCurrentOrder(userID)
  .then((data) => {
    if (!data[0]) {

      return userQueries.createNewOrderQuery(userID);
    }
    return data;
  })
  .then((data) => {
    const orderID = data[0].id;

    userQueries.queryAllFoodItems()
    .then((menuItems) => {
      res.render('menu', { menuItems: menuItems.rows, orderID});
    });
  });

});

module.exports = router;
