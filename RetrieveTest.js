var Firebase = require("firebase"); //pull firebase database for Node.js
// Get a reference to our posts
var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

// Retrieve new posts as they are added to our database
ref.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("Author: " + newPost.author);
  console.log("Title: " + newPost.title);
  console.log("Previous Post ID: " + prevChildKey);
});

// Get the data on a post that has changed
ref.on("child_changed", function(snapshot) {
  var changedPost = snapshot.val();
  console.log("The updated post title is " + changedPost.title);
});

// Get the data on a post that has been removed
ref.on("child_removed", function(snapshot) {
  var deletedPost = snapshot.val();
  console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
});

var count = 0;
ref.on("child_added", function(snap) {
  count++;
  console.log("added", snap.key());
});
// length will always equal count, since snap.val() will include every child_added event
// triggered before this point
ref.once("value", function(snap) {
  console.log("initial data loaded!", Object.keys(snap.val()).length === count);
});
