const express = require('express');
const router  = express.Router();
const {getAllOrderItems} = require("../db/queries/orders");


//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {
  getAllOrderItems(10)
  .then(orders_items => {

    res.render("admin", { orders_items });
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});


// READ ONE
//UPDATE
//DELETE




module.exports = router;
