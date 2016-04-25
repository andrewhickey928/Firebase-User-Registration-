
var Firebase = require("firebase"); //pull firebase database for Node.js

var ref = new Firebase("https://blinding-fire-9819.firebaseio.com/");

/*
ref.createUser({
  email    : 'John.Smith@firebase.com',
  password : 'Itsasecret'
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});
*/

// To authenticate a user with Custom Login, we must provide each client with a secure JWT that has been generated on a server.
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("jQRDVb9c4iOaWhOQHndvZwpN76GrnRM0GMUMGoJ0");
var token = tokenGenerator.createToken(
  { uid: "1", some: "arbitrary", data: "here" }
);

// Create a callback to handle the result of the authentication
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}
// Authenticate users with a custom authentication token
ref.authWithCustomToken("<token>", authHandler);
// Alternatively, authenticate users anonymously
ref.authAnonymously(authHandler);
// Or with an email/password combination
ref.authWithPassword({
  email    : 'John.Smith@firebase.com',
  password : 'Itsasecret'
}, authHandler);

// Or via popular OAuth providers ("facebook", "github", "google", or "twitter")
/*
ref.authWithOAuthPopup("<provider>", authHandler);
ref.authWithOAuthRedirect("<provider>", authHandler);
*/

/*
//Logging Users out
ref.unauth()
*/


/*
// EMAIL AND PASSWORD AUTHORIZATION
// Created User in Firebase
ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});


// Logging a user in with the following snippit
ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});


//Sending Password Reset Email to user
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.resetPassword({
  email : "andrew.hickey@asu.edu"
}, function(error) {
  if (error === null) {
    console.log("Password reset email sent successfully");
  } else {
    console.log("Error sending password reset email:", error);
  }
});
*/

/*
//WASN'T ABLE TO SEE IT WORK
// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

// Register the callback to be fired every time auth state changes
ref.onAuth(authDataCallback);
// To stop listening for changes
ref.offAuth(authDataCallback);

//Additionally, you can use the getAuth() method to synchronously check authentication state
var authData = ref.getAuth();
if (authData) {
  console.log("User " + authData.uid + " is logged in with " + authData.provider);
} else {
  console.log("User is logged out");
}
*/

/*
//Login with twitter
ref.authWithOAuthPopup( "Twitter", function(error, authdata) {
  console.log(authdata);
});

// prefer pop-ups, so we don't navigate away from the page
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    if (error.code === "TRANSPORT_UNAVAILABLE") {
      // fall-back to browser redirects, and pick up the session
      // automatically when we come back to the origin page
      ref.authWithOAuthRedirect("google", function(error));
    }
  } else if (authData) {
    // user authenticated with Firebase
  }
});
*/

// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
var isNewUser = true;
ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
});
// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}
