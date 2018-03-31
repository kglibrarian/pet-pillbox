

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
        
            var drugName = results[i].drug_name
        // Creating and storing a div tag
        var drugDiv = $("<div>");
        drugDiv.attr("data-id", i);
        
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text(drugName);

        //Creating an add button next to each drug name
        var b = $("<button class='add'>").text("+").attr("id", i);
        p.prepend(b);
    
        console.log(b);
        // Appending the paragraph to the drugDiv
        drugDiv.append(p);
        

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $(".drugs-appear-here").prepend(drugDiv);

        };
    
    });  
       
    
    });  
    
    
    $(document).on("click", '.add', function() {
        //Prevent the default function of button
        event.preventDefault(); 

        //Console log that the add button was pushed
        console.log("The add button was pushed!");
        console.log("This is the id on the clicked add " +$(this).attr('id'));
        //Create a variable called searchTerm to hold the value that the user entered into the search box
        var clickedID = $(this).attr('id');
       var addedDrugTerm = $("div").find('[data-id='+ clickedID + ']');
       

        //Console log the addedDrugTerm  
        console.log(addedDrugTerm);

        // Creating and storing a div tag
        var usersDrugDiv = $("<div>");

        // Creating a paragraph tag with the item the user wants to add to their list
        // var p = $("<p>").text(addedDrugTerm);

        //Creating a delete button next to each drug name
        // var b = $("<button class='delete'>").text("-").attr("delete");
        // p.prepend(b);

        // Appending the paragraph to the drugDiv
        usersDrugDiv.append(addedDrugTerm);

       // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $(".user-drugs-appear-here").prepend(usersDrugDiv);

    });

    // function emptyDrugDiv() {
    //     $(".drugs-appear-here").empty();
   // }
    
});   
    
    
    
    