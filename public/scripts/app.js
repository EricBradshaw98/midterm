$(document).ready(function() {

//addtocart

$('.addToCartButton').on('click', function() {
  $(this).closest('.addToCartForm').trigger("submit");
  $(this).closest('.addToCartForm')[0].reset();
});

$('.addToCartForm').submit(function(e) {
  e.preventDefault();
  const newURL = $(this).attr("action");
  const values = $(this).serialize();

  $.ajax({
    type: "POST",
    url: newURL,
    data: values,
    success: (res) => {
      console.log("success");
    }
  });
});

//removefromcart

$('.removeItemAjax').submit(function(e) {
  e.preventDefault();
  const newURL = $(this).attr("action");
  const values = $(this).serialize();


  $.ajax({
    type: "POST",
    url: newURL,
    data: values,
    success: (jsonData) => {
      const currentSubtotal = jsonData.subtotal;
      const newHTML = `<p>SUBTOTAL : $${currentSubtotal}</p>`;
      $("subtotalTarget").empty().append(newHTML);
    }
});
});

//quantity add remove

$('.quantityAjax').on("keyup keydown change", function() {
  $(".update-form").trigger("submit");
});


$('.remove-btn').on('click', function() {
  $(this).closest(".removeItemAjax").trigger("submit");
  const $menuItem = $(this).closest('foodItem');
  $menuItem.hide();
});

//update
$('.update-form').submit(function(e) {
  e.preventDefault();
  const newURL = $(this).attr("action");
  const values = $(this).serialize();


  $.ajax({
    type: "POST",
    url: newURL,
    data: values,
    success: (jsonData) => {
      const currentSubtotal = jsonData.subtotal;
      const newHTML = `<p>SUBTOTAL : $${currentSubtotal}</p>`;
      $("subtotalTarget").empty().append(newHTML);
    }
  });
});

//adjust quantity

//plus minus
$('quantity-btn').on('click', function() {
  if ($(this).hasClass('fa-plus')) {
    const add = parseInt($(this).parent().find('quantityAjax').val()) +1;
    $(this).parent().find('quantityAjax').val(add).trigger('change');
  }

  if ($(this).hasClass('fa-minus')) {
    const remove = parseInt($(this).parent().find('quantityAjax').val()) -1;

    if (remove === 0) {
      remove = 1;
    }

    $(this).parent().find('quantityAjax').val(remove).trigger('change');
  }
  });
});
