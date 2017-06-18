
// Variables
var searchTerm;
var gifAnimated = false;
var topics = ["roller derby", "greyhounds", "Kimmy Schmidt", "Sheldon Cooper", "Pitch Perfect"];
var queryURL;

// Web Elements
var ratingArea = $("<p></p>");
//var wellSection = $("<div class='well'></div>");
var gifArea = $("#gifs-appear-here");


// Creates a button for each topic
var generateGifTriggerButtons = function(){
  for (topic in topics){
    createAndAddButtonForTopic(topics[topic])
  }
};

// Creates a button from a topic
var createAndAddButtonForTopic = function(topic){
  var button = $("<button></button>");
  $(button).html(topic);
  button.addClass( "btn btn-info topicBtn");
  $('#btns-appear-here').append(button);
  $(button).on('click', clickedTopicButton);
};

// Pulls the value of the button clicked and sets it as the search term in the url param
var clickedTopicButton = function(evt) {
  searchTerm = $(evt.target).text();
  $('#gif-input').val(searchTerm);
  searchFor(searchTerm);
};

// AJAX call
var searchFor = function(searchTerm) {
  queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    var gifs = response.data;
    $('#gifs-appear-here .well').empty()
    for (gif in gifs){
      // Retrieving the URL for the image and grabbing the rating
      var stillGifImgURL = gifs[gif].images.original_still.url;
      var animatedGifImgURL = gifs[gif].images.original.url;
      var rating = gifs[gif].rating;

      // Creating elements to hold the image and rating
      var stillGif = $("<img>").attr("class", "gif still").attr("src", stillGifImgURL);
      var animatedGif = $("<img>").attr("class", "gif animated").attr("src", animatedGifImgURL);
      var ratingP = $("<p>").text("Rating: " + rating);

      var wellSection = $('<div class="well"></div>');
      // Putting it all together
      wellSection.append(stillGif);
      wellSection.append(animatedGif);
      wellSection.append(ratingP);

      gifArea.prepend(wellSection);
    }
  });
}

// When a gif is clicked, animate
$(document).on('click', '.gif', function(evt) {
  $(evt.target.closest('.well')).toggleClass('animated');
});

// Adds search term to topics list and re-generates buttons
$('#add-gif').on('click', function (){
  var searchTerm = $('#gif-input').val();
  createAndAddButtonForTopic(searchTerm);
  searchFor(searchTerm);
});

// Upon page load ready, generates buttons
$(document).ready(function() {
  generateGifTriggerButtons();
});