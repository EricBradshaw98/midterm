const express = require('express');
const router  = express.Router();
const {getAllReviewItems} = require("../db/queries/reviews");
const db = require('../db/connection');
//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {
  getAllReviewItems()
  .then(review_items => {
    console.log(review_items)
    res.render("reviews", { review_items });
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});



router.post("/submit", async (req, res) => {
  const itemID  = req.body.reviewContent;
  console.log("itemID", itemID)
  console.log(req.body, itemID)
  try{    
    await db.query('INSERT INTO reviews (review, user_id) VALUES ($1, 3)', [itemID]);
    res.status(200).json({ message: 'Item added'});
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
})



// READ ONE
//UPDATE
//DELETE

module.exports = router;