// This script was found on the firebase-simple-login
// my Firebase url
var firebase = new Firebase("https://blinding-fire-9819.firebaseio.com/");

// monitor state changes and react to updates
var authClient = new FirebaseSimpleLogin(chatRef, function(error, user) {
   if (error) {
       // an error occurred while attempting login
       console.log(error);
   } else if (user) {
       // user authenticated with Firebase
       console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
   } else {
       // user is logged out
   }
});

// This script was foudn on the firebase-simple-login under the "Authentication Providers" then "Email & Password"
// I THOUGHT THIS WOULD OPEN AND ALLOW THE USER TO LOG IN
var authClient = new FirebaseSimpleLogin(myRef, function(error, user) { ... });
authClient.login('password', {
 email: '<email@domain.com>',
 password: '<password>'
});

// perform the login (to Facebook in this case) I THOUGHT THIS WOULD OPEN AND ALLOW THE USER TO LOG IN WITH FACEBOOK
authClient.login('facebook');
