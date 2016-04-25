var Firebase = require("firebase"); //pull firebase database for Node.js
// Get a reference to our posts
var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");

/*
// Ordered by Height
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

// Why is there a dimensions?
ref.orderByChild("dimensions/height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

// Query names in alphabetical order
ref.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

// Sort the dinosaurs by their score
scoresRef.orderByValue().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});


// limittoFirst(#)-Will receive the first #
// limitToLast(#)-Will receive the last #
// Sort by weight from the last two
ref.orderByChild("weight").limitToLast(2).on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

// Good for scoreboard to list the top three scores
scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});



// RANGE QUERIES
ref.orderByChild("height").startAt(3).on("child_added", function(snapshot) {
  console.log(snapshot.key())
});

ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

// combine startAt() and endat() to find all dinosaurs whose name starts with the letter "b"
ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

// Filters to find exact match. -height of 25
ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
*/

//combining techniques to create complex queries.  For example: finding the name of the dinosaur that is just shorter than Stegosaurus
ref.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
  var favoriteDinoHeight = stegosaurusHeightSnapshot.val();
  var queryRef = ref.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2)
  queryRef.on("value", function(querySnapshot) {
      if (querySnapshot.numChildren() == 2) {
        // Data is ordered by increasing height, so we want the first entry
        querySnapshot.forEach(function(dinoSnapshot) {
          console.log("The dinosaur just shorter than the stegasaurus is " + dinoSnapshot.key());
          // Returning true means that we will only loop through the forEach() one time
          return true;
        });
      } else {
        console.log("The stegosaurus is the shortest dino");
      }
  });
});
