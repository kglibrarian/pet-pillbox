
$(document).ready(function(){
    $("#everything").hide();


    var newUser = {
        "userId": {
          "email": {},
          "petList":{}

        }
    }


/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMAKT2l9OJ3XqZWcVH13y4u-A6Vk2931E",
    authDomain: "pet-pillbox.firebaseapp.com",
    databaseURL: "https://pet-pillbox.firebaseio.com",
    projectId: "pet-pillbox",
    storageBucket: "pet-pillbox.appspot.com",
    messagingSenderId: "1096759389317"
};

firebase.initializeApp(config);

var database = firebase.database();
var dbRef = database.ref();

        //Clear out firebase
        // database.ref().remove();


       








    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
      /**
       * Handles the sign up button press.
       */
      function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }
      /**
       * Sends an email verification to the user.
       */
      function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
      }
      function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Password Reset Email Sent!');
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
      }
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
           
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;


            //    Hides and shows appropriate divs
            $("#login").hide();
            $("#everything").show();
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
      }
      window.onload = function() {
        initApp();
      };

    //   function writeUserData(userId, name, email, imageUrl) {
    //     firebase.database().ref('users/' + userId).set({
    //         displayName: user.displayName,
    //         email: user.email,
    //         uid :user.uid,
    //     });
    //   };

    //   writeUserData();
    






















    // // 2. Button for adding User ID
    // $("#sign-in-btn").on("click", function (event) {
    //     event.preventDefault();

             
    //     // Grabs user input
    //     var userId = $("#user-id-input").val().trim();
    //     var email = $("#email-input").val().trim();

    //     //Display username and email on page
    //     $(".user-id").text(userId);
    //     $(".user-email").text(email);

    //     dbRef.once("value", function (snapshot) {
    //         if (snapshot.hasChild(userId)) {
    //         //var $resultsdiv = $('<div>+resultsTitle+</div>');
    //         //$("body").append($resultsdiv);
    //         alert("User " + userId + " already existed!");
    //         // window.location = "..\karen_index.html";
    //         }
    //         else {
    //         // New user
    //             newUser.userId = userId;
    //             newUser.email = email;
    //             newUser.petList = "this is a pet";

    //         // Save user data to the database
    //         // debugger;
    //         database.ref().push(newUser);

    //         // Logs everything to console
    //         //console.log(newUser.id);
    //         //console.log(newUser.email);

    //         // Alert
    //         alert("User " + userId + " successfully added");

    //         // Clears all of the text-boxes
    //         $("#user-id-input").val("");
    //         $("#email-input").val("");
    //         };

        

    //         //Hides and shows appropriate divs
    //         $("#login").hide();
    //         $("#everything").show();
    //     });
    // });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    // database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // //console.log(childSnapshot.val());

    // // Store everything into a variable.
    // var userId = childSnapshot.val().id;
    // var email = childSnapshot.val().email;

    

    //Do we need this code?
    // $("#user-table > tbody").append("<tr><td>" + userId + "</td><td>" + email + "</td></tr>");
    // });

// bc

    $(".js-search").on("click", function(event) {
            //Prevent the default function of button
            event.preventDefault();

            //Console log that the putton was pushed
            console.log("The button was pushed!");

            //Clear out the div
            $(".drugs-appear-here").empty();

            //Create a variable called searchTerm to hold the value that the user entered into the search box
            var searchTerm = $('.js-search-term').val().trim();

            //Console log the searchTerm
            console.log(searchTerm);

            // Construct a queryURL using the search term
                var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=" + searchTerm + "&pagesize=5&page=2" ;

            // Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After data comes back from the request
                .then(function(response) {
                console.log(queryURL);
                console.log(response);

                // storing the data from the AJAX request in the results variable
                console.log(response.data.title);
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var drugDiv = $("<div>");
                drugDiv.attr("data-id", i);

                //Create variable to hold drug title
                var drugTitle = results[i].title;

                //Create variable to hold set id
                var setID = results[i].setid;

                //Creating an add button next to each drug name
                // var addButton = $("<button class= 'add btn'>").text("+");
                var addButton = $("<button class='add btn'>").text("+").attr("id", i);
                // p.prepend(b);

                // Creating a paragraph tag with the drug name
                // var p = $("<p>").text(results[i].title);
                var title = $("<p class='drug-title'>").text(drugTitle);

                //Creating a pargraph tag with the setID
                var titleID  = $("<p>").text(setID).attr("id",i).hide();


               // First empty, and then append the paragraph to the drugDiv
                drugDiv.empty().append(addButton, title, titleID);
                // drugDiv.prepend(b);

              // Prepending the drugDiv to the HTML page in the "#drugs-appear-here" div
              $(".drugs-appear-here").prepend(drugDiv);

            };
        });

        $(document).on('click', '.add', function() {

             //Prevent the default function of button
             event.preventDefault();

             //Console log that the add button was pushed
             console.log("The add button was pushed!");


             //Create a variable called searchTerm to hold the value that the user entered into the search box

            //  var addedDrugTerm = $(this).parent().get(0).innerText.slice(1);
            var clickedID = $(this).attr('id');
            var addedDrugTerm = $("div").find('[data-id='+ clickedID + ']');

             //Console log the addedDrugTerm
            console.log("This is the added drug term: " + addedDrugTerm);

            //  $("<button>").addClass("delete");
            //  console.log($("<button>"));

             // Creating and storing a div tag
             var usersDrugDiv = $("<div>").addClass("usersDrugDiv");

            //  Creating a paragraph tag with the item the user wants to add to their list
            //  var p = $("<p>").text(addedDrugTerm);
            //  console.log(p);

            //  Creating a delete button next to each drug name
            //  var bb = $("<button class='delete btn'>").text("-");

            //  p.prepend(bb);


            // Appending the paragraph to the drugDiv
            // usersDrugDiv.prepend(bb);
            // usersDrugDiv.append(p);
            // usersDrugDiv.append(bb, addedDrugTerm)
            usersDrugDiv.append(addedDrugTerm)


           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
           $(".user-drugs-appear-here").prepend(usersDrugDiv);


        });



        // function emptyDrugDiv() {
        //     $(".drugs-appear-here").empty();
        // }


    });

    // $('document').on('click','.delete', function(event) {

    //     //Prevent the default function of button
    //     event.preventDefault();

    //     //Console log that the button was pushed
    //     console.log("The delete button was pushed!");

    //     // console.log(this);
    //     // var removeDrugTerm = $(this).parent().get(0).html();

    // });

    $(document).on('click', '.delete', function() {
        event.preventDefault();
        console.log("the delete button was pushed!");
        $(this).parent().empty();

    });

    


    $(".js-savelist").on("click", function(event) {
        //Prevent the default function of button
        event.preventDefault();
        
        //Prevent saving if list is not named
        // if ( $(".list-name").val().length < 0 ) {
        //     $( "span" ).text( "Enter List Name" ).show().fadeOut( 1000 );
        //     event.preventDefault();
        // }

        //  database.ref().push(newUser);

        











        //Create empty array called userDrugList
        var userDrugList=[];
        var petDrugList;

    $(".usersDrugDiv").each(function(){

        var drugTitle = $(this).find('p:first').text();
        console.log(drugTitle);
        var setID = $(this).find("p:nth-of-type(2)").text();
        console.log(setID);
        var drugInfo = {
            drugTitle: drugTitle,
            setID: setID,
            } ;
        console.log (drugInfo);
        // return drugInfo;
        userDrugList.push(drugInfo);
        console.log("This is my userList" + userDrugList);
        });

         //Get the current userID
         var userId = firebase.auth().currentUser.uid;
        //  console.log("This is the current userId: " + userId);
         
        //  function writeUserData(list) {
        //      firebase.database().ref('users/' + userId).set({
        //        petDrugList: petDrugList,
             
        //      });
        //    }

        //    writeUserData(userDrugList);

        //    dbRef.child('users').child(userId).set({ "first_name": "rob", "age": 28 })
        listName = $(".list-name").val()
        dbRef.child(userId).child(listName).set({ userDrugList })
        //This works...
        // dbRef.child('users').child(userId).set({ userDrugList })
        // Get user's id from HTML 
        // let myUser = $(".user-id").text();
        // console.log("This is the current user's id: "+ myuser);

        // //Save userDrugList array into firebase
        // let currentUser = database.ref().orderByChild('id').equalTo(myUser);
        // currentUser.once("child_added", function(snapshot) {
        // snapshot.ref.child('petList').push(userDrugList);


       
        //Console log that the putton was pushed
        console.log("The save button was pushed!");

        // Create a variable to reference the database.
        // var database = firebase.database();

         //Clear out firebase
        // database.ref().remove();


        // save everything into variables for firebase
    //     $(".usersDrugDiv").each(function(){

    //     var drugTitle = $(this).find('p:first').text();
    //     console.log(drugTitle);
    //     var setID = $(this).find("p:nth-of-type(2)").text();
    //     console.log(setID);
    //      var drugInfo = {
    //          drugTitle: drugTitle,
    //          setID: setID,
    //      } ;
    //      console.log (drugInfo);
    //     return drugInfo;
    // });


        // //Get the current userID
        // var userId = firebase.auth().currentUser.uid;
        // console.log("This is the current userId: " + userId);
        // //Get the user data
        // // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        // //     //Do something with your user data located in snapshot

        // //     // database.ref().push({ userDrugList

        // //     // });
        // // });

        // // var ref: FIRDatabaseReference! = FIRDatabase.database().reference()
        // // self.database.child("Users").child("UserID").child(self.uid!).setValue(["Name": userName, "Email": userEmail])

        // function writeUserData(list) {
        //     firebase.database().ref('users/' + userId).set({
        //       petList: [],
            
        //     });
        //   }

        //   writeUserData();




          

            //    database.ref().push({ userDrugList

            // });

            $(".user-drugs-appear-here").empty();
            // database.ref().child("new").push(userList);


            // .setValue(true)
        // function createArray(drugInfo) {
        //     var userList=[];
        //     userList.push(drugInfo);
        //     console.log("This is the user list " + userList);
        // };

        // createArray();

        // $(".users-drugs-appear-here").each(function(drugInfo){
        //     var userList=[];
        //     userList.push(drugInfo);
        //     console.log("This is the user list " + userList);

        // });

        // $(".users-drugs-appear-here").each(function(drugInfo){

        //     var userList=[];
        //     userList.push(drugInfo);
        //     ref.child("currentUser").push(userList);
        // });

    $(".js-email").on("click", function() {
        //Prevent the default function of button
        event.preventDefault();
    
        //Console log that the putton was pushed
        console.log("The email button was pushed!");
        //modal trigger
    });
});

});
    // var dataArray = new Array();
    // $('.popupDiv').each(function(){
    //   var dataLayer = $(this).data('layer');
    //   //check if data-layer already processed
    //   if(!dataArray.indexOf(dataLayer))
    //   {
    //      //update data array
    //      dataArray.push(dataLayer);
    //      $('.popupDiv[data-layer="'+ dataLayer +'"]').each(function(){
    //         //do your stuff here
    //      });
    //   }
    // });
        //https://stackoverflow.com/questions/26271933/jquery-how-to-loop-through-elements-with-data-attribute

