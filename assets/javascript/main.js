

$(document).ready(function(){
    

$(".js-search").on("click", function() {
        //Prevent the default function of button
        event.preventDefault(); 
        
        //Console log that the putton was pushed
        console.log("The button was pushed!");
        
        //Create a variable called searchTerm to hold the value that the user entered into the search box
        var searchTerm = $('.js-search-term').val().trim();
        
        //Console log the searchTerm    
        console.log(searchTerm);
       
        // Construct a queryURL using the search term
            var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name=" + searchTerm ;

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
            console.log(response.data.drug_name);
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var drugDiv = $("<div>");
  
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text(results[i].drug_name);
            
            //Creating an add button next to each drug name
            var b = $("<button class='delete'>").text("+").attr("drug_name", "add", i);
            p.prepend(b);


           // Appending the paragraph to the drugDiv
            drugDiv.append(p);
            
          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $(".drugs-appear-here").prepend(drugDiv);

        }
    });  

    $(".add").on("click", function() {

         //Prevent the default function of button
         event.preventDefault(); 
        
         //Console log that the add button was pushed
         console.log("The add button was pushed!");
         
         //Create a variable called searchTerm to hold the value that the user entered into the search box
         var addedDrugTerm = $('.add').val();
         
         //Console log the addedDrugTerm  
         console.log(addedDrugTerm);

         // Creating and storing a div tag
         var usersDrugDiv = $("<div>");
  
         // Creating a paragraph tag with the item the user wants to add to their list
         var p = $("<p>").text(addedDrugTerm);
         
         //Creating a delete button next to each drug name
         var b = $("<button class='delete'>").text("-").attr("delete");
         p.prepend(b);


        // Appending the paragraph to the drugDiv
         usersDrugDiv.append(p);
         
       // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
       $(".user-drugs-appear-here").prepend(usersDrugDiv);

    });

    // 1. Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    //     authDomain: "time-sheet-55009.firebaseapp.com",
    //     databaseURL: "https://time-sheet-55009.firebaseio.com",
    //     storageBucket: "time-sheet-55009.appspot.com"
    // };
    
    // firebase.initializeApp(config);
    
    // var database = firebase.database();

    // // 2. Button for adding Employees
    // $(".add").on("click", function(event) {
    //     event.preventDefault();
    
    //     // Grabs user input
    //     var empName = $("#employee-name-input").val().trim();
            
    //     // Creates local "temporary" object for holding employee data
    //     var newEmp = {
    //     name: empName,
    //     role: empRole,
    //     start: empStart,
    //     rate: empRate
    //     };
  
    // // Uploads employee data to the database
    // database.ref().push(newEmp);






    // function emptyDrugDiv() {
    //     $(".drugs-appear-here").empty();
    // }






});   
    
    
    
    