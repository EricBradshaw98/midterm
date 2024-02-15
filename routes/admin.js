const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { Template } = require('ejs');
const userQueries = require('../db/queries/users');
// const client = require('./twilio-api');


// ADMIN ORDERS
router.get('/', (req, res) => {

  userQueries.getOrdersAdmin()
    .then(orderData => {
      const orders = orderData;
      // Map each order to a promise that fetches its items
      const itemPromises = orders.map(order => {

        let orderID = order.id;
        return userQueries.orderItemContentsQuery(orderID).then(itemData => {
          order.items = itemData; // Assign the fetched items to the order
          return order; // Return the updated order
        });
      });

      return Promise.all(itemPromises);
    })
    .then(ordersWithItems => {
      // after all orders have been populated with items, ready to render
      let orderID;

      for (const order of ordersWithItems) {
        if (order.status === 'In Progress') {
          orderID = order.id;
        }
      }
      res.render('admin', { orders: ordersWithItems, orderID });
    });
});



module.exports = router;
