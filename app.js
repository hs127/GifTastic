//for buttons 
//everytime user clicks submit - a new button should be added to the existing buttons and should show the buttom labeled as what the user inputted 
//check word guess HW 

//array for buttons 
var topics = [];
//at the click of submit button 


function displayInfo() {

  var animal = $("#animal").val().trim();
  animal = animal.replace(" ", "+");
  console.log(animal);

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WFJplg3iatAVEZaypAFwHH5yiMmJb84U&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(queryURL);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div>")

      $(animalDiv).addClass("container1");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item

      //animated one 
      // animalImage.attr("src", results[i].images.fixed_height.url);

      //static 
      // $('#my_image').data({ 'test-1': 'num1', 'test-2': 'num2' });


      // attr({ "data-test-1": num1, "data-test-2": num2 });
      // animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.addClass("gif").attr({
        src: (results[i].images.fixed_height_still.url),
        "data-state": "still",
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url
      });

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
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").addClass("animal-btn").attr("data-name", topics[i]).text(topics[i]);

    $("#animalButtons").append(button);
  }
}

function animate() {
  console.log("gif clicked");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

$("#run-search").on("click", function (event) {
  event.preventDefault();
  var animal = $("#animal").val().trim();
  topics.push(animal);
  console.log(topics);
  showButtons();
  displayInfo();
  $("#results").clear();

});

$(document).on("click", ".animal-btn", displayInfo);

$(document).on("click", ".gif", animate);

showButtons(); 