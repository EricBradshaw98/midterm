const express = require('express');
const router  = express.Router();
const db = require('../db/connection')
const { Template } = require('ejs')
const userQueries = require('../db/queries/users')
// const client = require('./twilio-api')

//get for viewing

router.get('/', (req, res) => {
  let templateVars = {};
  const userID = req.cookies.user_id || 1;
//all orders for a given ID
  userQueries.getCart(userID)
  .then((data) => {
    const orderID = data.rows[0].id;
    templateVars.orderID = orderID;
    return userQueries.getOrders(orderID)
  })
  .then((data) => {
    templateVars.menuItems = data;
    return userQueries.getSubtotal(templateVars.orderID);
  })
  .then((data) => {
    //undefined
    if (!data) {
      templateVars.subtotal = 0;

    } else {
      templateVars.subtotal = data.reduce((prev, curr) => {
        return Number(curr.subtotal) + prev;
      }, 0);
      templateVars.subtotal = templateVars.subtotal.toFixed(2);
      res.render('cart', templateVars)
    }
  })
  .catch((err) => {
    res.send(err);
  })
})

router.post('/:orderID', (req, res) => {

  const menuItemID = req.body.menuItemID;
  const quantity = req.body.quantity;
  const orderID = req.params.orderID;

  userQueries.searchCart(orderID, menuItemID)
    .then((data) => {
      if (data.length === 0) {
        // Food item not already in cart
        userQueries.addToCart(orderID, menuItemID, quantity)
          .then(() => res.redirect('/'));
      }
      if (data.length > 0) {
        // Food item already in cart
        userQueries.updateCart(quantity, orderID, menuItemID)
          .then(() => res.redirect('/'));
      }
    });
});

// SUBMIT ORDER
router.post('/submitOrder/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  userQueries.submitOrder(orderID)
    .then(() => {
      userQueries.getOwnerPhone()
        .then((phoneNumber) => {
          //  Leave commented to save $$
          client.messages
            .create({
              body: `Hello, there is a new online order: ${orderID}, please check Food Delivery App for details.`,
              to: phoneNumber, // Text your number
              from: '+14085604628', // From a valid Twilio number
            })
            .then((message) => {
              console.log(message.sid);
              console.log(message.body);
            })
            .catch((err) => console.log(err));
          res.redirect('/orders');
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
