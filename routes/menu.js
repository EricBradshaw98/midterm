const express = require('express');
const router  = express.Router();
const {getAllMenuItems} = require("../db/queries/menu");

//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {
  getAllMenuItems(10)
  .then(menu_items => {

    res.render("menu", { menu_items });
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