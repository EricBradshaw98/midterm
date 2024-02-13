const express = require('express');
const router  = express.Router();
const {getAllReviewItems} = require("../db/queries/reviews");
const db = require('../db/connection');
//CREATE (POST TO CREATE MENU ITEM)
//READ ALL
router.get("/", (req, res) => {
  getAllReviewItems()
  .then(review_items => {

    res.render("reviews", { review_items });
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});


router.post("/addReview", async (req, res) => {
  const { itemId } = req.body;
  try{    
    await db.query('INSERT INTO reviews (review, customer_id) VALUES (1, $1)', [itemId]);
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