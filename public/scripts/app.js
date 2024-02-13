// Client facing scripts here
$("document").ready(function() {
  console.log('document ready starts')
  
  // down arrow button handler to show/hide new tweet on click
  $("#review-submit").on("click", function() {
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
  });
  console.log('document ready done')
});