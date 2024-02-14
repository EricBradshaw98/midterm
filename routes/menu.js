const express = require('express');
const router  = express.Router();
const {getAllMenuItems} = require("../db/queries/menu");
const userQueries = require('../db/queries/users')


//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {

  const userID = req.cookies.customer_id || 1;

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

//CREATE
//READ ALL
//READ ONE
//UPDATE
//DELETE


module.exports = router;
