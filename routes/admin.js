const express = require('express');
const router  = express.Router();
const {getAllOrderItems} = require("../db/queries/orders");
const {getAllOrderedItems} = require("../db/queries/ordered_items");

//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {
  Promise.all([
  getAllOrderItems(10),
  getAllOrderedItems(10)

])
  .then(([orders_items, ordered_items]) => {

    res.render("admin", { orders_items, ordered_items });
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
