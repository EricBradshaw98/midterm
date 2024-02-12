const express = require('express');
const router  = express.Router();
const database = require("../db/connection");






router.get("/", (req, res) => {
  database
    .getAllMenuItems(req.query, 20)
    .then((menu) => res.send({ menu }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
