$(document).ready(function() {
  // Temporary number
  const restaurantPhoneNumber = '+16478081891'; // Restaurant
  const clientPhoneNumber = '+16476673333'; // Client

  // Send order to the restaurant
  $.post('/api/sendsms/send-sms/', {
    phoneNumber: restaurantPhoneNumber,
    message: 'New order received.',
  }, function(data) {
    console.log(data);
  });
  
    // Send notification to client
    $.post('/api/sms-messaging/send-sms/', {
      phoneNumber: clientPhoneNumber,
      message: "Lighthouse restaurants has received your order. Your order will take 60 seconds to prepare",
    }, function(data) {
      console.log(data);
    });

  // After 1 minute the order ready will be sent
  setTimeout(function() {
    $.post('/api/sms-messaging/send-sms/', {
      phoneNumber: clientPhoneNumber,
      message: 'Your oder is ready for pickup!',
    }, function(data) {
      console.log(data);
    });
  }, 60000); // 60 seconds (60,000 milliseconds)
});