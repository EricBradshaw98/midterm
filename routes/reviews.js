const express = require('express');
const router  = express.Router();
const {getAllReviewItems} = require("../db/queries/reviews");

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


// READ ONE
//UPDATE
//DELETE




module.exports = router;