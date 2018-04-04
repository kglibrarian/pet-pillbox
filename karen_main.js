$(document).ready(function () {

    // bc
    var drugsToAdd = [];

    $(".js-search").on("click", function () {
        //Prevent the default function of button
        event.preventDefault();

        //Console log that the putton was pushed
        console.log("The button was pushed!");

        //Create a variable called searchTerm to hold the value that the user entered into the search box
        var searchTerm = $('.js-search-term').val().trim();

        //Console log the searchTerm    
        console.log(searchTerm);

        // Construct a queryURL using the search term
        var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=" + searchTerm + "&pagesize=5&page=2";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                // storing the data from the AJAX request in the results variable
                console.log(response.data.title);
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var drugDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text(results[i].title);

                    //Creating an add button next to each drug name
                    var b = $("<button class= 'add'>").text("+");
                    p.prepend(b);


                    // Appending the paragraph to the drugDiv
                    drugDiv.append(p);
                    // drugDiv.prepend(b);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $(".drugs-appear-here").prepend(drugDiv);

                };
            });

        $(document).on('click', '.add', function () {

            //Prevent the default function of button
            event.preventDefault();

            //Console log that the add button was pushed
            console.log("The add button was pushed!");


            //Create a variable called searchTerm to hold the value that the user entered into the search box

            var addedDrugTerm = $(this).parent().get(0).innerText.slice(1);
            //bc
            drugsToAdd.push(addedDrugTerm);

            //Console log the addedDrugTerm  
            console.log("This is the added drug term: " + addedDrugTerm);

            // Creating and storing a div tag
            var usersDrugDiv = $("<div>");

            //  Creating a paragraph tag with the item the user wants to add to their list
            var p = $("<p>").text(addedDrugTerm);
            console.log(p);

            //  Creating a delete button next to each drug name
            var bb = $("<button class='delete'>").text("-");

            p.prepend(bb);


            // Appending the paragraph to the drugDiv
            // usersDrugDiv.prepend(bb);
            usersDrugDiv.append(p);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".user-drugs-appear-here").prepend(usersDrugDiv);

        });



        // function emptyDrugDiv() {
        //     $(".drugs-appear-here").empty();
        // }


    });
    $(".js-savelist").on("click", function () {
        //Prevent the default function of button
        event.preventDefault();

        //Console log that the putton was pushed
        console.log("The save button was pushed!");
        //modal trigger 

        // bc
        // Save user data to the database
        drugsToAdd.forEach(drug => {
            database.ref().push(drug);
            
            alert("Drug " + drug + " successfully saved");
        })
    });
});   
