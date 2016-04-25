
var Firebase = require("firebase"); //pull firebase database for Node.js

var myFirebaseRef = new Firebase("https://blinding-fire-9819.firebaseio.com/");

var usersRef = myFirebaseRef.child("users");
usersRef.push({
alanisawesome: {
full_name: "Alan Turing"
},
gracehop: {
full_name: "Grace Hopper"
}
});




var PlantRef = myFirebaseRef.child("Plant Type")
usersRef.set({
Tulip: {
climate: "high humidity"
Care_details: "Tulips require a high amount of sunlight..."
}
});
