//for buttons 
//everytime user clicks submit - a new button should be added to the existing buttons and should show the buttom labeled as what the user inputted 
//check word guess HW 

//array for buttons 
var animals = [];

function displayInfo() {
  var animal = $("#animal").val().trim();
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WFJplg3iatAVEZaypAFwHH5yiMmJb84U&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(p);
      animalDiv.append(animalImage);
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#results").prepend(animalDiv);
    }
  });
}

//show button functions 

function showButtons() {
  $("#animalButtons").empty();

  //loop thru the array of animals inputted 
  for (var i = 0; i < animals.length; i++) {
    var button = $("<button>").addClass("animal-btn").attr("data-name", animals[i]).text(animals[i]);
  }
}


$(document).on('click', '.answers', function (e) {
  console.log("user clicked");
  clearInterval(timerID);
  if ($(e.target).attr("data-ans") == myQuestions.quiz[quesIndex].correctAnswer) {
    console.log("correct answer");
    correctAnswer();
  }
  else {
    console.log("wrong answer");
    wrongAnswer();
  }

  e.preventDefault();
});