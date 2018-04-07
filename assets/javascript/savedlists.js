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
    
    
    var database = firebase.database();
    var dbRef = database.ref();
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("user signed in")
            var userId = firebase.auth().currentUser.uid;
            console.log("This is the current userId: " + userId);
            // $(".current-user-id").text(userId);
            // User is signed in.
            
            
        } else {
            // No user is signed in.
        }
    });
    
    console.log("Nothing is happening");
    //   Get the current userID
    // var currentUserId = $(".current-user-id").text();
    // console.log("Again, this is the current user ID: " + currentUserId);
    
    
    dbRef.on("child_added", function(snapshot, prevChildKey) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            // var myJSON = JSON.stringify(childData); 
            console.log(childData);
            // $(".saved-lists").text(childData);
            // $(".saved-lists").text(myJSON);
            
            var wrapper = $('.saved-lists');
            //   var wrapper = $('.saved-lists'), container;
            for (var key in childData){
                //   container = $('<div id="user-lists" class="container"></div>');
                //   wrapper.append(container);
                //   container.append('<div class="item">' + key +'</div>');
                let drugList = childData[key].userDrugList;                        //   container.append('<div class="category">' + childData[key].userDrugLists +'</div>');
                let listItems = $('<div class="one-list">' + key +'</div>');
                //   wrapper.append('<div class="category">' + childData[key].userDrugLists +'</div>');
                
                for(let i = 0; i < drugList.length; i++) {
                    let drug = drugList[i];
                    let drugContainer = $('<div>');
                    let drugText = $('<p>').attr('setid', drug.setID).text(drug.drugTitle);
                    drugContainer.append(drugText);
                    
                    var setId = drug.setID;
                    console.log(setId);
                    // debugger;
                    var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/" + setId + "/media.json";
                    console.log(queryURL);
                    // var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/1efe378e-fee1-4ae9-8ea5-0fe2265fe2d8/media.json"
                    
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
                        
                        var resultURL = response.data.media[0].url;
                        let image = $('<img>').attr('src', resultURL).css('display', 'none');
                        let button = $('<button>').text('Label');
                        button.on('click', function () {
                            $(this).next('img').toggle();
                        });
                        
                        drugContainer.append(button, image);
                        // Looping through each result item
                        // for (var i = 0; i < results.length; i++) {  
                        // };
                    });

                    listItems.append(drugContainer);
                } 
                wrapper.append(listItems);       
            }
        })
    })
    
     //THIS CODE IS FOR THE EMAIL BUTTON ------------------------------------------

     $(".js-email").on("click", function() {
        //Prevent the default function of button
        event.preventDefault();
    
        //Console log that the putton was pushed
        console.log("The email button was pushed!");
        //modal trigger
    }); 
    
    
    
    // childSnapshot.forEach(function(childSnapshot) {
    //     var childChildData = childSnapshot.val();
    //     console.log(childChildData);
    // var drugs = $("<div>");
    // var p = $("<p>"); 
    //     for (var key in childChildData){
    //         drugs.append('<p class="drug-title">' + JSON.stringify(childChildData[key]) + '</p>');
    //         wrapper.append(drugs);
    
    //     }
    
    
    // childSnapshot.forEach(function(childSnapshot) {
    //     var childChildChildData = childSnapshot.val();
    //     console.log(childChildChildData);
    //     var drugs = $("<div>");
    //     // var p = $("<p>"); 
    //         for (var key in childChildChildData){
    // drugs.append('<p class="drug-title">' + childChildChildData[key].drugTitle + '</p>');
    // wrapper.append(drugs);
    
    
    // var setID = childChildChildData[key].setID
    // console.log(setID);
    // // debugger;
    
    // var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/" + setID + "/media.json";
    // console.log(queryURL);
    // // var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/1efe378e-fee1-4ae9-8ea5-0fe2265fe2d8/media.json"
    //     // Performing an AJAX request with the queryURL
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     })
    //         // After data comes back from the request
    //         .then(function(response) {
    //         console.log(queryURL);
    //         console.log(response);
    
    //         // storing the data from the AJAX request in the results variable
    //         // console.log(response.data.title);
    //         var results = response.data.media[0].url;
    //         console.log("This is our image url " + results);
    //         // Looping through each result item
    //         // for (var i = 0; i < results.length; i++) {  
    //         // };
    // });
    
    
    
    
    
    
    
    
    
    // }         
    
    
    
    
    // })
    // })   
});










//THIS CODE IS FOR AJAX FDA DRUG INFORMATION BUT PROBLEM WITH CORS
// var queryURL = " https://api.fda.gov/drug/label.json?search=openfda.spl_set_id:" + setID + "+AND+ purpose" ;

// // Performing an AJAX request with the queryURL
// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//     // After data comes back from the request
//     .then(function(response) {
//     console.log(queryURL);
//     console.log(response);

//     // storing the data from the AJAX request in the results variable
//     // console.log(response.data.title);
//     // var results = response.data;

//     // Looping through each result item
//     // for (var i = 0; i < results.length; i++) {  
//     // };
// });
//THIS CODE IS FOR DAILYMED MEDIA INFORMATION BUT PROBLEM WITH CORS
// var queryURL = " https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/" + setID + "/media.json" ;

// // Performing an AJAX request with the queryURL
// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//     // After data comes back from the request
//     .then(function(response) {
//     console.log(queryURL);
//     console.log(response);

//     // storing the data from the AJAX request in the results variable
//     // console.log(response.data.title);
//     // var results = response.data;

//     // Looping through each result item
//     // for (var i = 0; i < results.length; i++) {  
//     // };
// });






// $(document).on('click', '.one-list', function(event) {

//     //Prevent the default function of button
//     event.preventDefault();

//     //Console log that the add button was pushed
//     console.log("The list was clicked on!");


//fruitRef.orderByKey().startAt(“5”),
//// Calling ref.toString() outputs the ref's entire path: https://...firebaseio.com/some/ref/path
// var peopleUrl = peopleRef.toString() + '.json?shallow=true'; 

// });

// var showList = firebase.ref();
// console.log(showList);


// showList.on("child_added", function(childSnapshot, prevChildKey) {

//     snapshot.forEach(function(childSnapshot) {
//         var key = childSnapshot.key;
//        console.log(key)
//     var childData = childSnapshot.val();
//     });
// });

// $(".saved-lists").text(showList);

// firebase.ref(userId).on("child_added", function(snapshot) {
// // Create a variable to reference the database.
// var database = firebase.database().ref("/userId");
// database.once("value")
// .then(function(snapshot){
//     snapshot.forEach(function(childSnapshot) {

//         // childSnapshot now contains all the user lists
//         var key = childSnapshot.key;
//         console.log(key)
//         var childData = childSnapshot.val();              // childData will be the actual contents of the child
//         console.log(childData);

//         var userListIndex = 0;
//         var userListArray = [];

//         var listTitle = childSnapshot.val().listTitle;
//         var setID = childSnapshot.val().setID;

// $(".saved-lists").append(listTitle);
// $(".set-id").append(setID).hide();

// https://stackoverflow.com/questions/42684712/display-data-from-firebase-database-in-a-html-page

//         });
//     }); 
// }); 


//     var leadsRef = database.ref('leads');
// leadsRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//     var childData = childSnapshot.val();
//     });
// });





// dataSnapshot now contains all the videos ids, lines & links
// this causes many performance issues

// Then I need to loop over all elements to extract ids !
//         var videoIdIndex = 0;
//         var videoIds = new Array();

//         dataSnapshot.forEach(
//             function(childSnapshot) {
//                 videoIds[videoIdIndex++] = childSnapshot.name();
//             }
//         );

//     }
// );







//         dataRef.ref().on("child_added", function(snapshot) {

//             // Log everything that's coming out of snapshot

//             console.log(snapshot.val());

//             console.log(snapshot.val().name);

//             console.log(snapshot.val().email);

//             console.log(snapshot.val().age);

//             console.log(snapshot.val().comment);

//             // Change the HTML to reflect

//             $("#name-display").text(snapshot.val().name);

//             $("#email-display").text(snapshot.val().email);

//             $("#age-display").text(snapshot.val().age);

//             $("#comment-display").text(snapshot.val().comment);

//           // Handle the errors

//           }, function(errorObject) {

//             console.log("Errors handled: " + errorObject.code);

//           });











// //Create div to hold and display the user's drug lists which have been saved in firebase
// var usersListDiv = $("<div>"); 

// //Create the buttons to display the drug information from ajax call to DailyMed
// var drugInfoButton = $('<a class="btn btn-primary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">');

// //Create an array of text for the drugInfoButtons
// var drugButtonArray = ["Purpose", "Uses", "Directions", "Warnings", "Questions"];

// //Create for loop to push href class and button text into each drugInfoButton
// drugInfoButton.text("") 
// drugInfoButton.addClass("href", drugURL); 

// //Display drugInfo object from firebase in div with class save-list



// $(".userslist").on("click", function() {
// //Prevent the default function of button
// event.preventDefault(); 

// //Console log that the putton was pushed
// console.log("The save button was pushed!");

// // Create a variable to reference the database.
// var database = firebase.database();

//Clear out firebase
// database.ref().remove();




// //create collapsable buttons: https://getbootstrap.com/docs/4.0/components/collapse/

//  //Create div to hold and display the user's drug lists which have been saved in firebase
//  var usersListDiv = $("<div>"); 

//  //Create the buttons to display the drug information from ajax call to DailyMed
//  var drugInfoButton = $('<a class="btn btn-primary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">');

//  //Create an array of text for the drugInfoButtons
//  var drugButtonArray = ["Purpose", "Uses", "Directions", "Warnings", "Questions"];

//  //Create for loop to push href class and button text into each drugInfoButton
//  drugInfoButton.text("") 
//  // drugInfoButton.addClass("href", drugURL); 