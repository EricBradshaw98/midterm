
const cart = [];

const addToOrder = function (menu) {
  cart.push(menu);
  console.log('cart', cart)
  renderCart();
}

const renderCart = function () {
  let total = 0;
 const cartList = $('.carted-items ol');
  cartList.empty()
  for(const item of cart) {
    cartList.append(`<li>${item.name} - $${item.price}</li>`);
    total += (item.price);

  }
  $('.cart-total').text(`Total: $${total}`);
}

$("document").ready(function() {
  console.log('document ready starts')
  renderCart();

  // down arrow button handler to show/hide new tweet on click
  $("#review-submit").on("click", function(event) {
    event.preventDefault();
    const reviewContent = $('.leave_review #review-text').val()
    console.log('reviewContent', reviewContent)

    if (!reviewContent.trim()) {
      showError('🛑 ⚠️ Review content cannot be empty! ⚠️ 🛑');
      return;
    }

    $.ajax({
      url: "http://localhost:8080/reviews/submit",
      context: document.body,
      data: {'reviewContent': reviewContent},
      method: "POST",
      success: function() {
        console.log('success')
      },
      error: function() {
        console.log('Problem saving review');
      }
    });
    console.log('document ready done')
  });
});

