$(document).ready(function(){

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

// Create a variable to reference the database.
var database = firebase.database().ref("UserLists").orderByKey();
database.once("value")
.then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();              // childData will be the actual contents of the child
  
        var drugTitle = childSnapshot.val().drugTitle;
        var setID = childSnapshot.val().setID;

        $(".drug-name").append(drugTitle);
        // $(".set-id").append(setID).hide();

//https://stackoverflow.com/questions/42684712/display-data-from-firebase-database-in-a-html-page
        
    });
}); 


//Create div to hold and display the user's drug lists which have been saved in firebase
var usersListDiv = $("<div>"); 

//Create the buttons to display the drug information from ajax call to DailyMed
var drugInfoButton = $('<a class="btn btn-primary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">');

//Create an array of text for the drugInfoButtons
var drugButtonArray = ["Purpose", "Uses", "Directions", "Warnings", "Questions"];

//Create for loop to push href class and button text into each drugInfoButton
drugInfoButton.text("") 
drugInfoButton.addClass("href", drugURL); 

//Display drugInfo object from firebase in div with class save-list



$(".userslist").on("click", function() {
//Prevent the default function of button
event.preventDefault(); 
            
//Console log that the putton was pushed
console.log("The save button was pushed!");

// Create a variable to reference the database.
var database = firebase.database();

 //Clear out firebase
// database.ref().remove();




//create collapsable buttons: https://getbootstrap.com/docs/4.0/components/collapse/

});