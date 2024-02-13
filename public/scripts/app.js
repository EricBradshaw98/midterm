// Client facing scripts here
$("document").ready(function() {
  console.log('document ready starts')
  
  // down arrow button handler to show/hide new tweet on click
  $("#review-submit").on("click", function() {
    event.preventDefault();
    const reviewContent = $('.leave_review #review-text').val()
    console.log('reviewContent', reviewContent)

    alert(reviewContent);

    if (!reviewContent.trim()) {
      showError('🛑 ⚠️ Review content cannot be empty! ⚠️ 🛑');
      return;
    }
    const formData = $(this).serialize();

    $.ajax({
    url: "http://localhost:8080/reviews",
    context: document.body,
    data: formData,
    method: "POST",
    success: function(formData, textStatus, jqXHR) {
      loadTweetsFromServer((tweets) => {
        addNewTweetToDisplay(tweets, sanitizedText);
      });
      resetNewTweetBox();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      displayError('Problem saving tweet');
    }
  });

  });
  
  // form submit handler to save new tweet to server and update display
  // $('.new-tweet-form').on("submit", function(event) {
  //   event.preventDefault();
  //   hideError();
  //   let sanitizedText = $("#tweet-text").val();
  //   if (newTweetValidation(sanitizedText)) {
  //     console.log('calling ajax')
  //     $.ajax({
  //       url: "http://localhost:8080/tweets",
  //       context: document.body,
  //       data: $("#tweet-text").serialize(),
  //       method: "POST",
  //       success: function(data, textStatus, jqXHR) {
  //         loadTweetsFromServer((tweets) => {
  //           addNewTweetToDisplay(tweets, sanitizedText);
  //         });
  //         resetNewTweetBox();
  //       },
  //       error: function(jqXHR, textStatus, errorThrown) {
  //         displayError('Problem saving tweet');
  //       }
  //     });
  //   } else {
  //     console.log('not calling ajax')
  //   }
  // });
  console.log('document ready done')
});