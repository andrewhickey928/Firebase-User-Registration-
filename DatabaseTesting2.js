
var Firebase = require("firebase"); //pull firebase database for Node.js

// RETRIEVING DATA
	// Get a reference to our posts
	// var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog");
	var ref = new Firebase("https://blinding-fire-9819.firebaseio.com");
	// Attach an asynchronous callback to read the data at our posts reference
//	  ref.on("value", function(snapshot) {       // Listing everything
//	  console.log(snapshot.val());
//	}, function (errorObject) {
//	  console.log("The read failed: " + errorObject.code);
//	});

	// Retrieve new posts as they are added to our database
	// "value" returns the entire content of the location, "child_added" used to retrieve list of items from the database
 ref.on("child_added", function(snapshot, prevChildKey) {
   var newPost = snapshot.val();
	  console.log("full_name: " + newPost.name);
		console.log("date of birth: " + newPost.date_of_birth);
	  console.log("Previous Post ID: " + prevChildKey);
	});

	// Get the data on a post that has changed
	ref.on("child_changed", function(snapshot) {
	  var changedPost = snapshot.val();
	  console.log("The updated post title is " + changedPost.title);
	});
