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

router.post("/submit", async (req, res) => {
  const itemId  = req.body.reviewContent;
  console.log(req.body, itemId)
  // try{    
  //   await db.query('INSERT INTO reviews (review, customer_id) VALUES ($1, 4)', [itemId]);
  //   res.status(200).json({ message: 'Item added'});
  // } catch (error) {
  //   console.error('error:', error);
  //   res.status(500).json({ message: 'Error adding item' });
  // }
})


//CREATE
//READ ALL
//READ ONE
//UPDATE
//DELETE


module.exports = router;
